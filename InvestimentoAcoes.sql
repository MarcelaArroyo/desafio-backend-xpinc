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
	`codCarteira` integer NOT NULL AUTO_INCREMENT,
	`codCliente` integer NOT NULL,
    `codAtivo` integer NOT NULL,
    `qtdeAtivo` integer NOT NULL,
    `versao` integer NOT NULL,
    PRIMARY KEY (`codCarteira`),
	FOREIGN KEY (`codCliente`) REFERENCES `clientes`(`codCliente`),
    FOREIGN KEY (`codAtivo`) REFERENCES `ativos`(`codAtivo`)
) ENGINE=InnoDB;

CREATE TABLE `contasInvestimento` (
	`codConta` integer NOT NULL AUTO_INCREMENT,
    `codCliente` integer NOT NULL,
    `saldo` decimal(10, 2) NOT NULL,
    `versao` integer NOT NULL,
    PRIMARY KEY (codConta),
    FOREIGN KEY (codCliente) REFERENCES clientes(codCliente)
) ENGINE=InnoDB;

CREATE TABLE `historicoTransacao` (
	`codTransacao` integer NOT NULL AUTO_INCREMENT,
    `codCliente` integer NOT NULL,
    `codAtivo` integer NOT NULL,
    `qtdeAtivo` integer NOT NULL,
    `tipoTransacao` varchar(50) NOT NULL,
    `valor` decimal(10, 2) NOT NULL,
    `data` datetime NOT NULL,
    PRIMARY KEY (codTransacao),
    FOREIGN KEY (codCliente) REFERENCES clientes(codCliente),
    FOREIGN KEY (codAtivo) REFERENCES ativos(codAtivo)
) ENGINE=InnoDB;

INSERT INTO `clientes` (`nome`, `email`, `password`) VALUES
	('Maria Silva', 'mariasilva@teste.com', '123456'),
    ('João Santos', 'jaosantos@teste.com', '234567'),
    ('Ana Oliveira', 'anaoliveira@teste.com', '345678'),
    ('José Alves', 'josealves@teste.com', '456789');
    
INSERT INTO `ativos` (`nome`, `valor`, `qtdeAtivo`) VALUES
	('AZUL4', 12.19, 100),
    ('PETR4', 27.96, 100),
    ('MGLU3', 2.78, 100),
    ('SAPR11', 17.77, 100);
    
INSERT INTO `carteiras` (`codCliente`, `codAtivo`, `qtdeAtivo`, `versao`) VALUES
	(1, 4, 50, 1),
    (1, 2, 30, 1),
    (3, 2, 100, 1),
    (4, 1, 200, 1);
    
INSERT INTO `contasInvestimento` (`codCliente`, `saldo`, `versao`) VALUES
	(3, 200.00, 1),
    (2, 100.00, 1),
    (4, 1000.00, 1),
    (1, 300.00, 1);
    
INSERT INTO `historicoTransacao` (`codCliente`, `codAtivo`, `qtdeAtivo`, `tipoTransacao`, `valor`, `data`)
VALUES
	(1, 2, 10, 'compra', 279.60, '2022-07-12 16:54:32'),
    (1, 3, 30, 'compra', 83.40, '2022-07-12 10:23:22'),
    (2, 4, 100, 'compra', 1777.00, '2022-07-13 16:54:32'),
    (1, 3, 20, 'venda', 55.60, '2022-07-14 17:55:12');