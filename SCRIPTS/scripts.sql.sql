
CREATE DATABASE DB_EPT;
USE DB_EPT

--Tabla de roles
CREATE TABLE roles (
    idRol INT(2) PRIMARY KEY NOT NULL AUTO_INCREMENT, 
    nombre VARCHAR(15) NOT NULL
)
INSERT INTO roles(nombre) VALUES
("Administrador"),
("Almacenista")


--Tabla usuarios
CREATE TABLE usuarios (
	idUsuario INT(6) PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(100) NOT NULL,
    correo VARCHAR(50) NOT NULL,
    contrasena VARCHAR(100) NOT NULL,
    idRol INT(2) NOT NULL,
    estatus INT(1) NOT NULL,
    FOREIGN KEY (idRol) REFERENCES roles(idRol)
)
INSERT INTO usuarios (nombre, correo, contrasena, idRol, estatus) VALUES 
("Admin", "admin@ept.com", "$2a$12$ip5roOjqMoIqFVYuIG.LaOIBi0jyLrM/8AWOlTLvmpuy7MuSarbee", 1, 1 ),
("Almacenista", "alm@ept.com", "$2a$12$tLwr9DO8HRbdv/ChQ95pLeW/QpUEFTJyK75lQ2WhfOzLy/T.LdmPe", 2, 1),


--Tabla productos
CREATE TABLE productos (
	idProducto INT(6) PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR (50) NOT NULL,
    precio DECIMAL(16,2),
    estatus INT(1) NOT NULL,
    cantidad INT(6) DEFAULT 0
)

--Tabla historiales
CREATE TABLE historiales (
	idHistorial INT(6) PRIMARY KEY AUTO_INCREMENT,
    idUsuario INT(6),
    idProducto INT(6),
    movimiento ENUM('Entrada', 'Salida'),
    fecha DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    cantidad INT(6)
)


