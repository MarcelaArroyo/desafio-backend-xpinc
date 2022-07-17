CREATE DATABASE IF NOT EXISTS `investimentoAcoes`;

USE `investimentoAcoes`;

CREATE TABLE `clientes` (
	`codCliente` integer NOT NULL AUTO_INCREMENT,
    `nome` varchar(100) NOT NULL,
    `email` varchar(45) NOT NULL,
    `password` varchar(45) NOT NULL,
    PRIMARY KEY (`codCliente`)
) ENGINE=InnoDB;

CREATE TABLE `ativos` (
	`codAtivo` integer NOT NULL AUTO_INCREMENT,
    `nome` varchar(100) NOT NULL,
    `valor` decimal(10, 2) NOT NULL,
    `qtdeAtivo` integer NOT NULL,
    PRIMARY KEY (`codAtivo`)
) ENGINE=InnoDB;

CREATE TABLE `carteiras` (
	`codCliente` integer NOT NULL,
    `codAtivo` integer NOT NULL,
    `qtdeAtivo` integer NOT NULL,
    PRIMARY KEY (`codCliente`, `codAtivo`),
	FOREIGN KEY (`codCliente`) REFERENCES `clientes`(`codCliente`),
    FOREIGN KEY (`codAtivo`) REFERENCES `ativos`(`codAtivo`)
) ENGINE=InnoDB;

CREATE TABLE `contasInvestimento` (
	`codConta` integer NOT NULL AUTO_INCREMENT,
    `codCliente` integer NOT NULL,
    `saldo` decimal(10, 2) NOT NULL,
    PRIMARY KEY (codConta),
    FOREIGN KEY (codCliente) REFERENCES clientes(codCliente)
) ENGINE=InnoDB;

INSERT INTO `clientes` (`nome`, `email`, `password`) VALUES
	('Maria Silva', 'mariasilva@teste.com', '123456'),
    ('João Santos', 'jaosantos@teste.com', '234567'),
    ('Ana Oliveira', 'anaoliveira@teste.com', '345678'),
    ('José Alves', 'josealves@teste.com', '456789');
    
INSERT INTO `ativos` (`nome`, `valor`, `qtdeAtivo`) VALUES
	('AZUL4', '350.00', '100'),
    ('PETR4', '350.00', '100'),
    ('MGLU3', '350.00', '100'),
    ('SAPR11', '350.00', '100');
    
INSERT INTO `carteiras` (`codCliente`, `codAtivo`, `qtdeAtivo`) VALUES
	('1', '4', '50'),
    ('1', '2', '30'),
    ('3', '2', '100'),
    ('4', '1', '200');
    
INSERT INTO `contasInvestimento` (`codCliente`, `saldo`) VALUES
	('3', '200.00'),
    ('2', '100.00'),
    ('4', '1000.00'),
    ('1', '300.00');