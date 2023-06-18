ALTER USER 'root' IDENTIFIED WITH mysql_native_password BY 'root';

SET
 NAMES utf8mb4;

SET
 CHARACTER SET utf8mb4;

CREATE TABLE digital_wave_games.conta (
 id BIGINT(20) NOT NULL AUTO_INCREMENT,
 email VARCHAR(100) NOT NULL,
 nome VARCHAR(30) NOT NULL,
 senha VARCHAR(30) NOT NULL,
 PRIMARY KEY (id)
);

CREATE TABLE digital_wave_games.contafuncionario (
 id BIGINT(20) NOT NULL AUTO_INCREMENT,
 id_Conta BIGINT(20) NOT NULL,
 nivelAcesso VARCHAR(20) NOT NULL,
 PRIMARY KEY (id),
 INDEX id_Conta_idx (id_Conta ASC) VISIBLE,
 CONSTRAINT id_Conta FOREIGN KEY (id_Conta) REFERENCES digital_wave_games.conta (id) ON DELETE NO ACTION ON UPDATE NO ACTION
);

CREATE TABLE digital_wave_games.contausuario (
 id BIGINT(20) NOT NULL AUTO_INCREMENT,
 user_id_conta BIGINT(20) NOT NULL,
 emailConfirm TINYINT(1) NOT NULL,
 saldo DOUBLE NOT NULL,
 PRIMARY KEY (id),
 INDEX user_id_conta_idx (user_id_conta ASC) VISIBLE,
 CONSTRAINT user_id_conta FOREIGN KEY (user_id_conta) REFERENCES digital_wave_games.conta (id) ON DELETE NO ACTION ON UPDATE NO ACTION
);

CREATE TABLE digital_wave_games.codigoverificacao (
 id BIGINT(20) NOT NULL AUTO_INCREMENT,
 cod_id_conta BIGINT(20) NOT NULL,
 expiracao DATE NOT NULL,
 ativo TINYINT(1) NOT NULL,
 codigo INT NOT NULL,
 PRIMARY KEY (id),
 INDEX cod_id_conta_idx (cod_id_conta ASC) VISIBLE,
 CONSTRAINT cod_id_conta FOREIGN KEY (cod_id_conta) REFERENCES digital_wave_games.conta (id) ON DELETE NO ACTION ON UPDATE NO ACTION
);

CREATE TABLE digital_wave_games.produto (
 id BIGINT(20) NOT NULL AUTO_INCREMENT,
 nome VARCHAR(150) NOT NULL,
 preco DOUBLE NOT NULL,
 plataforma VARCHAR(150) NOT NULL,
 descricao VARCHAR(1500) NOT NULL,
 estoque INT NOT NULL,
 PRIMARY KEY (id)
);

CREATE TABLE digital_wave_games.carrinho (
 id BIGINT(20) NOT NULL AUTO_INCREMENT,
 car_id_conta BIGINT(20) NOT NULL,
 PRIMARY KEY (id),
 INDEX id_conta_idx (car_id_conta ASC) VISIBLE,
 CONSTRAINT car_id_conta FOREIGN KEY (car_id_conta) REFERENCES digital_wave_games.conta (id) ON DELETE NO ACTION ON UPDATE NO ACTION
);

CREATE TABLE digital_wave_games.itemcarrinho (
 id BIGINT(20) NOT NULL AUTO_INCREMENT,
 id_carrinho BIGINT(20) NOT NULL,
 id_produto BIGINT(20) NOT NULL,
 quantidade INT NOT NULL,
 PRIMARY KEY (id),
 INDEX id_produto_idx (id_produto ASC) VISIBLE,
 INDEX id_carrinho_idx (id_carrinho ASC) VISIBLE,
 CONSTRAINT id_produto FOREIGN KEY (id_produto) REFERENCES digital_wave_games.produto (id) ON DELETE NO ACTION ON UPDATE NO ACTION,
 CONSTRAINT id_carrinho FOREIGN KEY (id_carrinho) REFERENCES digital_wave_games.carrinho (id) ON DELETE NO ACTION ON UPDATE NO ACTION
);

INSERT INTO
 digital_wave_games.produto (id, nome, preco, plataforma, descricao, estoque)
VALUES
 (
  1,
  'The Last of Us Part II',
  59.99,
  'PlayStation 5',
  'A aclamada sequência do jogo de ação e aventura',
  10
 ),
 (
  2,
  'Assassins Creed Valhalla',
  49.99,
  'Xbox Series X',
  'Viva a épica saga dos vikings',
  15
 ),
 (
  3,
  'Animal Crossing: New Horizons',
  39.99,
  'Nintendo Switch',
  'Crie sua própria ilha paradisíaca',
  20
 );

INSERT INTO
 digital_wave_games.conta (id, email, nome, senha)
VALUES
 (
  1,
  'admin@example.com',
  'Administrador',
  'senha123'
 );

INSERT INTO
 digital_wave_games.contafuncionario (id, id_Conta, nivelAcesso)
VALUES
 (1, 1, 'Administrador');