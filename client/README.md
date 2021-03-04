## GT innovision Intranet Example

본 프로젝트는 React 학습 목적으로 만들어진 개인 프로젝트입니다.

## Project Specification

node version : v15.8.0

yarn version : v1.22.10

front-client : react

back-end service : node + express

## DataBase
AWS RDS : instance ( gtintranet ) , host ( gtintranet.c1dvihjoyxil.ap-northeast-2.rds.amazonaws.com ), user / user1234

CREATE TABLE EMPLOYEE (

	id INT PRIMARY KEY AUTO_INCREMENT,

	image VARCHAR(1024),

	name VARCHAR(64),
	
	birthday VARCHAR(64),

	gender VARCHAR(64),

	rank VARCHAR(64)

) DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
