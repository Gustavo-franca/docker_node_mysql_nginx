# Desafio 1 - Programa FUllCycle de Aceleração

## Descrição do Desafio
Crie um programa utilizando sua linguagem de programação favorita que faça uma listagem simples do nome de alguns módulos do curso Full Cycle os trazendo de um banco de dados MySQL. Gere a imagem desse container e a publique no DockerHub.

Gere uma imagem do nginx que seja capaz que receber as solicitações http e encaminhá-las para o container.

Crie um repositório no github com todo o fonte do programa e das imagens geradas.

Crie um arquivo README.md especificando quais comandos precisamos executar para que a aplicação funcione recebendo as solicitações na porta 8080 de nosso computador. Lembrando que NÃO utilizaremos Docker-compose nesse desafio.


## Como rodar manualmente

1. clone este repositório localmente (você precisará do arquivo test.env). caso não queira avance ao passo 2
```bash
 git clone https://github.com/Gustavo-franca/docker_node_mysql_nginx
```

2. primeiro crie uma rede docker bridge
```bash
docker network create desafio-pfa-net
```
3. crie um volume
```bash
docker volume create db_desafio_pfa
```
4. Agora rode a imagem do mysql  do repositório com o seguinte comando

```bash
   docker run -d -it --rm --network desafio-pfa-net -v db_desafio_pfa:/var/lib/mysql   --env-file ./test.env --name mysql gustavofranca/mysql
```
caso opte por não baixar o repo.Use este comando e se precisar modifique as váriaveis.

```bash
   docker run -d -it --rm --network desafio-pfa-net -v db_desafio_pfa:/var/lib/mysql -e MYSQL_ROOT_PASSWORD=fullcycle -e MYSQL_DATABASE=fullcycle -e MYSQL_USER=fullcycle -e MYSQL_PASSWORD=fullcycle --name mysql gustavofranca/mysql
```


5. rode a imagem node 

```bash
docker run -d -it --rm --network desafio-pfa-net --env-file ./test.env --name node gustavofranca/node
```
caso opte por não baixar o repo.Use este comando e se precisar modifique as váriaveis.
```bash
docker run -d -it --rm --network desafio-pfa-net --env-file -e MYSQL_ROOT_PASSWORD=fullcycle -e MYSQL_DATABASE=fullcycle -e MYSQL_USER=fullcycle -e MYSQL_PASSWORD=fullcycle -e DB_HOST=mysql --name node gustavofranca/node
```

6. suba o servidor nginx. caso precisar modifique a porta espelhada.
```bash
docker run -d -it --rm --network desafio-pfa-net --name nginx -p 8080:80 gustavofranca/nginx
```

7. acesse no navegador [http:localhost:8080]()

Obs : na primeira vez levará mais tempo para conseguir a conexão com o banco de dados,pois ele está sendo criado.nas próximas vezes o banco já estará gerado no volume,sendo assim mais rápido.


## Como rodar com os Scripts .sh (linux)

para facilitar o processo decidi criar 3 scripts :
* build : para recriar as 3 imagens com um comando;
* run : para criar a rede e volume e subir os container 
* stop : para parar todos os conteiners

para usar voce irá precisar

1. Baixar o repo
```bash
 git clone https://github.com/Gustavo-franca/docker_node_mysql_nginx
```
2. dar permissão 
```bash
chmod +x script_name.sh
```
3. rodar o script
```bash
./script_name.sh
```

## Como rodar com Docker compose

1. clone o repositório

* . rode o comando para subir os container(na primeira vez leva 2 minutos)
```bash
    docker-compose up -d --build
```
* inativar e remover os container
```bash
    docker-compose down
```


## Pontos Que Aprendi ao Executar o Desafio
* Criar e gerenciar conteiners pela cli do docker
* Comprender o estado de um container e sua imutabilidade
* Configuração de conexão entre conteiners e encontrar container pelos seus apelidos criados pela rede do docker 
* Criação e uso de volumes 
* criar scris de bash para automatizar os passos e ler os script para entender os entrypoints das dockerfiles usadas.
* Pesquisar e ler código das dockerfile do mysql
    * Descobri como rodar um script ao iniciar um container: o conteiner na hora do build pesquisa por todos os arquivos dentro da pasta docker-entrypoint-initdb.d, porém isso só acontece quando não tem um banco já criado
    * configurar as credencias passando as váriaveis de ambiente
    * criar um banco de dados passando váriavel de ambiente, criar apenas quando não existe db já criado
    * O mysql ao passar usuário delimita o acesso daquele usuário para o banco de especificado
    * corrigir erro de character utf-8 passando a váriavel de ambiente LANG=c.UFT-8. (o padrão é ASCII)
* configurações básicas do nginx e suas funcionalidades
* Criar arquivos Dockerfile e Comprender funcionalidades dos Comando 
    * ENTRYPOINT - comando executa ao rodar um container de forma obrigatória
    * CMD - comando padrão que pode ser substituído ao rodar o container
    * COPY - copia arquivos do diretório do computador para algum local dentro do container ao gerar a imagem
    * FROM - escolhe uma imagem base para criação do Dockerfile
    * RUN - roda um comando durante o processo de build 
    * ENV - cria váriaveis padrão podendo ser utilizadas no processo de build ,run e na propia dockerFile
    * VOLUME - cria um volume de um caminho do conteiner, este volume é criado com um hash aleatório o que dificulta usar para vários conteiners
    * WORKDIR - modifica o caminho relativo do container para a pasta indicada .

* Aprendi tbm a contacatenar comandos :) como estes aqui
```bash
    #remove todos os volumes
    docker volume rm $(docker volume list -q)
    #remove todos os conteiner ativos e inativos
    docker rm -f $(docker ls -a -q)
```

já que chegou até aqui me siga nas redes sociais :) hehe

[instagram](https://www.instagram.com/gustacfranca/)
[linkedin](https://www.linkedin.com/in/gustavocfranca/)