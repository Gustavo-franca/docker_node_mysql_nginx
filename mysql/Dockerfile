FROM mysql


COPY docker-entrypoint-initdb.d/* docker-entrypoint-initdb.d/

ENV MYSQL_DATABASE=fullcycle
ENV MYSQL_USER=fullcycle
ENV MYSQL_PASSWORD=fullcycle
ENV MYSQL_ROOT_PASSWORD=sadhakjhdjksahsheuir2394ydnqw894jdqw9487ngwh83f
ENV LANG=C.UTF-8

CMD ["mysqld","--default-authentication-plugin=mysql_native_password"]