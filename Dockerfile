FROM node:16

# create app directory inside container
WORKDIR /usr/app

# instala dependências 
# Garante a copia do package.json e lock.json
# copia para o app 
COPY package*.json ./

RUN npm install 

# pra producao rodar
#RUN npm ci --only=production

#Copiar arquivos de código
COPY . . 

EXPOSE 8080

#Executa quando rodar container 
CMD ["node", "server.js"]
