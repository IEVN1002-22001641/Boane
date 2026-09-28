from flask import Flask, request, jsonify, session
from flask_cors import CORS
import sqlite3

app = Flask(__name__)
app.secret_key = "secreto_super_seguro"

# 🔥 CONFIG DE SESIÓN (AQUÍ VA)
app.config.update(
    SESSION_COOKIE_SAMESITE="Lax",
    SESSION_COOKIE_SECURE=False
)

CORS(app, supports_credentials=True)

DATABASE = "database.db"

# ---------------------------
# CONEXIÓN DB
# ---------------------------
def get_db():
    conn = sqlite3.connect(DATABASE)
    conn.row_factory = sqlite3.Row
    return conn

# ---------------------------
# CREAR TABLAS
# ---------------------------
def init_db():
    conn = get_db()
    cursor = conn.cursor()

    cursor.execute("""
    CREATE TABLE IF NOT EXISTS usuarios (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nombre TEXT,
        email TEXT UNIQUE,
        password TEXT,
        rol TEXT,
        direccion TEXT
    )
    """)

    cursor.execute("""
        CREATE TABLE IF NOT EXISTS servicios (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nombre TEXT,
            descripcion TEXT,
            precio REAL
        )
        """)


    cursor.execute("SELECT COUNT(*) FROM servicios")
    count = cursor.fetchone()[0]

    if count == 0:
        servicios = [
            ("Limpieza Regular", "Servicio básico", 150),
            ("Limpieza Profunda", "Servicio intensivo", 300),
            ("Post-Mudanza", "Limpieza completa", 600),
        ]

        cursor.executemany(
            "INSERT INTO servicios (nombre, descripcion, precio) VALUES (?, ?, ?)",
            servicios
        )

    cursor.execute("""
    CREATE TABLE IF NOT EXISTS pedidos (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        id_cliente INTEGER,
        id_empleado INTEGER,
        id_servicio INTEGER,
        fecha TEXT,
        hora TEXT,
        estado TEXT,
        direccion TEXT
    )
    """)

    conn.commit()
    conn.close()
# ---------------------------
# REGISTRO
# ---------------------------
@app.route("/register", methods=["POST"])
def register():
    data = request.json

    print("🔥 REGISTRO DATA:", data)

    conn = get_db()
    cursor = conn.cursor()

    try:
        cursor.execute("""
        INSERT INTO usuarios (nombre, email, password, rol, direccion)
        VALUES (?, ?, ?, ?, ?)
        """, (
            data["nombre"],
            data["email"],
            data["password"],
            data["rol"],
            data["direccion"]
        ))

        conn.commit()
        print("🔥 USUARIO REGISTRADO")

        return jsonify({"message": "Usuario creado"})

    except Exception as e:
        print("🔥 ERROR REGISTRO:", e)
        return jsonify({"error": "Email ya existe"}), 400

    finally:
        conn.close()
# ---------------------------
# LOGIN
# ---------------------------
@app.route("/login", methods=["POST"])
def login():
    data = request.json
    conn = get_db()
    cursor = conn.cursor()

    cursor.execute("SELECT * FROM usuarios WHERE email=? AND password=?",
                   (data["email"], data["password"]))

    user = cursor.fetchone()
    conn.close()

    if user:
        session["user_id"] = user["id"]
        session["rol"] = user["rol"]

        print("🔥 LOGIN USER ID:", user["id"])

        return jsonify({
            "id": user["id"],
            "nombre": user["nombre"],
            "rol": user["rol"]
        })
    else:
        return jsonify({"error": "Credenciales incorrectas"}), 401

# ---------------------------
# PERFIL
# ---------------------------
@app.route("/perfil", methods=["GET"])
def perfil():
    print("🔥 SESSION ACTUAL:", dict(session))

    if "user_id" not in session:
        return jsonify({"error": "No autenticado"}), 401

    conn = get_db()
    cursor = conn.cursor()

    cursor.execute("SELECT * FROM usuarios WHERE id=?", (session["user_id"],))
    user = cursor.fetchone()

    conn.close()

    return jsonify(dict(user))

# ---------------------------
# CREAR PEDIDO
# ---------------------------
@app.route("/pedidos", methods=["POST"])
def crear_pedido():
    print("🔥 SESSION AL CREAR PEDIDO:", dict(session))

    if "user_id" not in session:
        return jsonify({"error": "No autenticado"}), 401

    data = request.json
    print("🔥 DATA RECIBIDA:", data)

    conn = get_db()
    cursor = conn.cursor()

    cursor.execute("""
    INSERT INTO pedidos (id_cliente, id_servicio, fecha, hora, estado, direccion)
    VALUES (?, ?, ?, ?, 'pendiente', ?)
    """, (
        session["user_id"],
        data["id_servicio"],
        data["fecha"],
        data["hora"],
        data["direccion"]
    ))

    conn.commit()
    conn.close()

    print("🔥 PEDIDO GUARDADO")

    return jsonify({"message": "Pedido creado"})

# ---------------------------
# MIS PEDIDOS
# ---------------------------
@app.route("/mis-pedidos", methods=["GET"])
def mis_pedidos():
    print("🔥 SESSION EN MIS PEDIDOS:", dict(session))

    if "user_id" not in session:
        return jsonify({"error": "No autenticado"}), 401

    conn = get_db()
    cursor = conn.cursor()

    cursor.execute("""
    SELECT pedidos.*, servicios.nombre as servicio_nombre
    FROM pedidos
    JOIN servicios ON pedidos.id_servicio = servicios.id
    WHERE pedidos.id_cliente=?
    """, (session["user_id"],))

    pedidos = cursor.fetchall()

    print("🔥 PEDIDOS EN BACKEND:", [dict(p) for p in pedidos])

    conn.close()

    return jsonify([dict(p) for p in pedidos])

# ---------------------------
# LOGOUT
# ---------------------------
@app.route("/logout", methods=["POST"])
def logout():
    session.clear()
    print("🔥 SESIÓN CERRADA")
    return jsonify({"message": "Sesión cerrada"})

@app.route("/pedidos-disponibles", methods=["GET"])
def pedidos_disponibles():
    if "user_id" not in session or session["rol"] != "empleado":
        return jsonify({"error": "No autorizado"}), 403

    conn = get_db()
    cursor = conn.cursor()

    cursor.execute("""
    SELECT pedidos.*, servicios.nombre as servicio_nombre
    FROM pedidos
    JOIN servicios ON pedidos.id_servicio = servicios.id
    WHERE pedidos.estado = 'pendiente'
    """)

    pedidos = cursor.fetchall()
    conn.close()

    return jsonify([dict(p) for p in pedidos])

@app.route("/aceptar-pedido/<int:id>", methods=["POST"])
def aceptar_pedido(id):
    if "user_id" not in session or session["rol"] != "empleado":
        return jsonify({"error": "No autorizado"}), 403

    conn = get_db()
    cursor = conn.cursor()

    cursor.execute("""
    UPDATE pedidos
    SET estado = 'aceptado', id_empleado = ?
    WHERE id = ?
    """, (session["user_id"], id))

    conn.commit()
    conn.close()

    return jsonify({"message": "Pedido aceptado"})


if __name__ == "__main__":
    init_db()
    app.run(debug=True)