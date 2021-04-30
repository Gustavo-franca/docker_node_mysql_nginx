FROM mysql


COPY docker-entrypoint-initdb.d/* docker-entrypoint-initdb.d/


ENV LANG=C.UTF-8

CMD ["mysqld","--default-authentication-plugin=mysql_native_password"]