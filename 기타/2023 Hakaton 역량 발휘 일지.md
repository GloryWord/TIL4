## 지하철 데이터 구축 기록 (데이터 엔지니어링)

1. MySQL 설치

2. Open API를 가져와서 json 파일로 가공 (지하철 영문,일문,중문 데이터 제거)

3. MySQL Workbench에 들어가서 CREATE DATABASE Capital_Subway_DB와 아이디 비번, GRANT ALL ON Capital_Subway_DB.* TO 사용자 이름 까지 완료.

4. 상단바 메뉴에 DB아이콘 Create a new schema in the connected server 눌러서 스키마 만들었는데, 이거랑 CREATE DATABASE랑 충돌해서, 스키마 탭에서 삭제하고 다시 만들어야 했었다.

5. SQL에 연결하려는데 에러 발생. pymysql, mysql-connector-python, mysqlclient 세 라이브러리 모두 안되므로 MySQL에 문제가 있다고 판단.

6. MySQL에서 테이블까지 만들고 파이썬으로 연결 다시 시도했지만 여전히 "Unknown database 'capital_subway_db'라고 나옴.

7. 포트번호를 port=3307  변경했더니. 모든 라이브러리에서 연결 성공

8. 이제 커서와 excute 함수가 뭔지 좀 알아야 할 것 같다. 아래는 GPT 답변 내용.


 `cursor = cnx.cursor()`: `cnx.cursor()` 메서드는 MySQL 데이터베이스 연결(`cnx`)로부터 커서(`cursor`)를 생성합니다. 커서는 데이터베이스와 상호 작용하여 쿼리를 실행하고 결과를 가져올 수 있는 객체입니다. 커서를 생성한 후에는 쿼리를 실행할 수 있는 상태가 됩니다.

`cnx.commit()`: `commit()` 메서드는 변경사항을 데이터베이스에 커밋하는 역할을 합니다. 데이터베이스에 삽입, 업데이트 또는 삭제와 같은 변경 작업을 수행한 후에는 변경사항을 커밋하여 영구적으로 반영해야 합니다. 커밋을 하지 않으면 변경사항은 롤백되어 이전 상태로 돌아갈 수 있습니다.

`cursor.close()`: `close()` 메서드는 커서를 닫는 역할을 합니다. 커서를 더 이상 사용하지 않을 때는 명시적으로 커서를 닫아 자원을 해제해야 합니다. 커서를 닫으면 해당 커서로부터 생성된 결과 집합에 더 이상 접근할 수 없습니다. "커서닫기 !=연결닫기"

 `cnx.close()`: `close()` 메서드는 MySQL 데이터베이스 연결을 닫는 역할을 합니다. 데이터베이스 연결은 프로그램이 더 이상 사용하지 않을 때 명시적으로 닫아야 합니다. 연결을 닫으면 MySQL 서버와의 연결이 종료되며, 해당 연결에 사용된 자원들이 해제됩니다.

위의 코드는 데이터베이스 작업이 끝났을 때 커서와 연결을 정리하는 데 사용됩니다. 이렇게 함으로써 리소스 누수를 방지하고, 데이터베이스 연결을 관리할 수 있습니다.

9. SQL server에 접속하여 cmd를 키라는 말이 무슨 말인지 몰랐다. 일반 cmd에 mysql 관련 명령어를 쳐봤자, 인식을 못했다. 알고보니 MySQL Command Line을 실행해야 하는 것이었다.

10. 파이썬에서 코드 실행으로 SQL을 다룰 수 있는데, 일단 연결 먼저 한 뒤에, cursor를 이용해야 한다. 그래야 그 값을 파이썬으로 가져올 수 있다. connection.cursor( )없이는 불가능하다.

11. 다음은 SQL cmd에 대한 기록이다.

mysql> SHOW TABLES FROM capital_subway_db;
+-----------------------------+
| Tables_in_capital_subway_db |
+-----------------------------+
| subway_info                 |
+-----------------------------+
1 row in set (0.00 sec)

(그리고 FROM이 두 번 나온다. 테이블에 대한 FROM, DB FROM)
mysql> SHOW COLUMNS FROM subway_info FROM capital_subway_db;
+------------+--------------+------+-----+---------+-------+
| Field      | Type         | Null | Key | Default | Extra |
+------------+--------------+------+-----+---------+-------+
| STATION_CD | varchar(20)  | NO   | PRI | NULL    |       |
| STATION_NM | varchar(100) | NO   |     | NULL    |       |
| LINE_NUM   | varchar(30)  | NO   |     | NULL    |       |
+------------+--------------+------+-----+---------+-------+


12. 파이썬으로 MySQL 접근하여 미리 만든 테이블에 데이터 넣고 commitconnection = MySQLdb.connect(user="Chuldong",passwd="Chuldong123!",host="localhost",db="Capital_Subway_DB",port=3307)
cursor = connection.cursor() # SQL에 접근하여 조작하는 권한 획득.
cursor.execute("INSERT INTO subway_info VALUES(%s, %s, %s)",("test1","test2","test3"))
connection.commit()

13. 그 후 SQL server에서 SHOW COLUMNS FROM subway_info FROM capital_subway_db; 하니까 테이블이 나오는게 아니라 컬럼명과 제약조건만 나옴. 테이블을 조회해야함.

14. select * from subway_info; 에서도 안됨. 왜냐면 어떤 DB인지 모르기 때문이다. USE capital_subway_db;를 쓴다.

15. SQL에서 쓴 단일 쿼리는, 커밋이 자동으로 된다고 한다. (물론 상단 메뉴바에서 설정을 바꿀 수 있지만...)

