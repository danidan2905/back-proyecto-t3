CREATE DATABASE IF NOT EXISTS `ccvma` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `ccvma`;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `consultorios`
--
-- Creación: 10-10-2024 a las 01:50:13
--

CREATE TABLE preguntas_seguridad(
	id INT PRIMARY KEY AUTO_INCREMENT,
    valor TEXT NOT NULL
);

INSERT INTO preguntas_seguridad (valor) 
VALUES 
('¿En qué ciudad naciste?'),
('¿Cuál es tu color favorito?'),
('¿Cuál es tu comida favorita?'),
('¿Cuál es el nombre de tu canción favorita?'),
('¿Cuál es tu animal favorito?'),
('¿Cuál es tu pasatiempo favorito?'),
('¿Cuál es tu videojuego favorito?');

DROP TABLE tokens;

CREATE TABLE tokens(
	id INT PRIMARY KEY AUTO_INCREMENT,
    id_user INT NOT NULL,
    token varchar(255) NOT NULL,
    created_at DATETIME NOT NULL DEFAULT current_timestamp,
    expires_at DATETIME NOT NULL DEFAULT current_timestamp,
    state INT NOT NULL DEFAULT 1,
    FOREIGN KEY (id_user) REFERENCES usuarios(id)
);

CREATE TABLE `consultorios` (
  `id` int(11) NOT NULL,
  `num_consultorio` int(50) NOT NULL,
  `observaciones` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `consultorios_medicos`
--
-- Creación: 08-10-2024 a las 00:50:53
--

CREATE TABLE `consultorios_medicos` (
  `id` int(11) NOT NULL,
  `id_medico` int(11) DEFAULT NULL,
  `id_consultorio` int(11) DEFAULT NULL,
  `condicion` enum('M','T','E','not_used') DEFAULT NULL,
  `hora_inicio` time DEFAULT NULL,
  `hora_fin` time DEFAULT NULL,
  `solvente` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `especialidad`
--
-- Creación: 08-10-2024 a las 00:10:43
--

CREATE TABLE `especialidad` (
  `id` int(11) NOT NULL,
  `descripcion` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `especialidad_medicos`
--
-- Creación: 08-10-2024 a las 00:55:00
--

CREATE TABLE `especialidad_medicos` (
  `id` int(11) NOT NULL,
  `id_especialidad` int(11) DEFAULT NULL,
  `id_medico` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `historial_pagos`
--
-- Creación: 08-10-2024 a las 02:09:32
--

CREATE TABLE `historial_pagos` (
  `id` int(11) NOT NULL,
  `id_consultorios_medicos` int(11) DEFAULT NULL,
  `fecha_corte` date DEFAULT NULL,
  `fecha_pago` date DEFAULT NULL,
  `monto` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `mantenimiento_ac`
--
-- Creación: 08-10-2024 a las 01:55:16
--

CREATE TABLE `mantenimiento_ac` (
  `id` int(11) NOT NULL,
  `id_consultorio` int(11) DEFAULT NULL,
  `cap_enf` varchar(100) DEFAULT NULL,
  `tecnico` varchar(100) DEFAULT NULL,
  `ult_fecha_mantenimiento` date DEFAULT NULL,
  `precio_mant` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `medicos`
--
-- Creación: 08-10-2024 a las 01:58:40
--

CREATE TABLE `medicos` (
  `id` int(50) NOT NULL,
  `nombre_completo` varchar(100) NOT NULL,
  `cedula` int(20) NOT NULL,
  `num_telefono` int(50) NOT NULL,
  `correo` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--
-- Creación: 10-10-2024 a las 01:46:46
--

CREATE TABLE `usuarios` (
  `id` int(11) NOT NULL,
  `nombre` varchar(50) DEFAULT NULL,
  `usuario` varchar(50) DEFAULT NULL,
  `contraseña` varchar(50) DEFAULT NULL,
  `cargo` enum('superadmin', 'admin', 'regular') DEFAULT NULL,
  `id_pregunta_seguridad` INT NOT NULL,
  `respuesta_seguridad` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `consultorios`
--
ALTER TABLE `consultorios`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `consultorios_medicos`
--
ALTER TABLE `consultorios_medicos`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_consultorio` (`id_consultorio`),
  ADD KEY `id_medico` (`id_medico`);

--
-- Indices de la tabla `especialidad`
--
ALTER TABLE `especialidad`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `especialidad_medicos`
--
ALTER TABLE `especialidad_medicos`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_especialidad` (`id_especialidad`),
  ADD KEY `id_medico` (`id_medico`);

--
-- Indices de la tabla `historial_pagos`
--
ALTER TABLE `historial_pagos`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_consultorios_medicos` (`id_consultorios_medicos`);

--
-- Indices de la tabla `mantenimiento_ac`
--
ALTER TABLE `mantenimiento_ac`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_consultorio` (`id_consultorio`);

--
-- Indices de la tabla `medicos`
--
ALTER TABLE `medicos`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `consultorios`
--
ALTER TABLE `consultorios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `consultorios_medicos`
--
ALTER TABLE `consultorios_medicos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `especialidad`
--
ALTER TABLE `especialidad`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `especialidad_medicos`
--
ALTER TABLE `especialidad_medicos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `historial_pagos`
--
ALTER TABLE `historial_pagos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `mantenimiento_ac`
--
ALTER TABLE `mantenimiento_ac`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `medicos`
--
ALTER TABLE `medicos`
  MODIFY `id` int(50) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,
  MODIFY `contraseña` varchar (255) DEFAULT NULL;

--
-- Restricciones para tablas volcadas
--

-- 
-- Filtros para la tabla `usuarios`
-- 
ALTER TABLE `usuarios`
  ADD CONSTRAINT `usuarios_ibfk_1` FOREIGN KEY (`id_pregunta_seguridad`) REFERENCES `preguntas_seguridad` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;


--
-- Filtros para la tabla `consultorios_medicos`
--
ALTER TABLE `consultorios_medicos`
  ADD CONSTRAINT `consultorios_medicos_ibfk_1` FOREIGN KEY (`id_medico`) REFERENCES `medicos` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `consultorios_medicos_ibfk_2` FOREIGN KEY (`id_consultorio`) REFERENCES `consultorios` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `especialidad_medicos`
--
ALTER TABLE `especialidad_medicos`
  ADD CONSTRAINT `especialidad_medicos_ibfk_1` FOREIGN KEY (`id_especialidad`) REFERENCES `especialidad` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `especialidad_medicos_ibfk_2` FOREIGN KEY (`id_medico`) REFERENCES `medicos` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `historial_pagos`
--
ALTER TABLE `historial_pagos`
  ADD CONSTRAINT `historial_pagos_ibfk_1` FOREIGN KEY (`id_consultorios_medicos`) REFERENCES `consultorios_medicos` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `mantenimiento_ac`
--
ALTER TABLE `mantenimiento_ac`
  ADD CONSTRAINT `mantenimiento_ac_ibfk_1` FOREIGN KEY (`id_consultorio`) REFERENCES `consultorios` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;
