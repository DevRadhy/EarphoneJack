<h1 align="center" >EarphoneJack</h1>

<p align="center">
  <a href="#%EF%B8%8F-introdução">Introdução</a> •
  <a href="#-tecnologias">Tecnologias</a> •
  <a href="#-contribuindo">Contribuindo</a> •
  <a href="#-configurando-projeto">Projeto</a>
</p>

<br />

<div align="center" >
  <img
  src="https://user-images.githubusercontent.com/50425715/116156743-410a6a80-a6c2-11eb-96d8-87c5f2e93319.png"
  alt="EarphoneJack"
  width=600
  height=260
  />
</div>

<br />

<p align="center">
  <img
    src="https://img.shields.io/badge/PR-Welcome-brightgreen"
    alt="PR"
  />
  <img
    src="https://img.shields.io/discord/777348105838395433?label=Discord&logo=Discord"
    alt="Discord"
  />
</p>

## 🙆‍♀️ Introdução

EarphoneJack é uma bot legal de música para Discord, feita para dar uma nova experiência nas conversas.

## Como surgi

O nome EarphoneJack vem de uma personagem chamada **Kyouka Jirou** do anime **Boku no Hero Academia**, que tem a individualidade (é como eles chamam os poderes), de "música".

## 🚀 Tecnologias

Projeto feito usando biblioteca javascript para Discord.

- **Node.js**
- **Express**
- **Typescript**
- **Discord.js**
- **YouTube API v3**
- **Axios**
- **Ytdl-core**

## 🧑‍🚀 Contribuindo

Antes de começar contribuir leia o [CODE_OF_CONDUCT](./CODE_OF_CONDUCT.md) e [CONTRIBUTNIG](./CONTRIBUTING.md), para saber como agir na comunidade e como contribuir da melhor forma, e que pode fazer suas alrerações serem adicionadas ao projeto.

## 🎉 Configurando Projeto

Primeiro você precisa clonar o projeto e instalar as dependências. Você pode fazer isso usando o seguinte comando no ternminal.

```bash
git clone https://github.com/DevRadhy/EarphoneJack.git 
```

e para instalar as dependências basta usar

```bash
npm install
# ou yarn install
```

após clonar o projeto e instalar as dependências, você precisará configurar algumas variáveis de ambiente antes de rodar o projeto, para isso crie um arquivo `.env` na raiz do projeto. Você pode usar `.env.development` ou `.env.local`.

e crie duas variáveis:

```bash
# Token para iniciar o bot
SECRET_TOKEN=your_secret_token_bot_here

# Chave do Youtube API v3
YOUTUBE_KEY=your_youbube_api_key

# Dominios permitidos separados por ','
URLS_ORIGINS_LIST=
```

após configurar essas variáveis você pode iniciar o projeto com todas as funcionalidades.

O projeto possui um floxo de controle, além do **Github**, no **[Notion.so](https://www.notion.so/EarphonJack-8f3bb0ca2a5644baafbb1f067c23088b)**

### Iniciando o projeto

Depois de instalar as dependêcias e configurar as variáveis de ambiente, basta usar o seguinte comando para iniciar o projeto.

```bash
npm run dev
# ou yarn dev
```

quando o bot estiver pronto, você verá no terminal com a menssagem, algo como:

```bash
Server On
Ready!
```

## Fazendo chamandas HTTP

O bot tem um funcionalidade para fazer chamadas **HTTP**, para mandar mensagens em servidores e canais especificos, adicionando reações a mensagem.

Para user essa funcionalidade é só fazer uma requisição para `/sendMessages`, com o seguinte conteúdo no `body` da requisição:

```json
{
  "guildId": "id_do_servidor",
  "channelId": "id_do_canal",
  "message": "mensagem_que_será_enviada",
  "reactions": [ "emoji" ]
}
```

- **ID do servidor:** `guildId` recebe uma `string`, com o **ID** do servidor onde a mensagem deve ser enviada.

- **ID do canal:** O campo `channelId`, recebe um `string` com o **ID** do canal, onde a mesagem deve ser enviada.

- **Mensagem:** `message`, pode receber dois tipos, uma `string` com a mensagem, ou uma `array` de `strings`, onde cada elemento é considerado uma linha, mas os dois formatos aceitam textos em multilinhas.

 - **Tipos de Reações:** O campo de `reactions` recebe um `string` e pode receber emojis padrões que são usados normalmente no **Discord**, mas também pode receber emojis personalizados de cada servidor, além de emojis animados.
 
## License

<p xmlns:cc="http://creativecommons.org/ns#" xmlns:dct="http://purl.org/dc/terms/"><a property="dct:title" rel="cc:attributionURL" href="https://github.com/dev-house-community/EarphoneJack">EarphoneJack</a> by <a rel="cc:attributionURL dct:creator" property="cc:attributionName" href="https://github.com/DevRadhy">Lucas Jantsch Guedes</a> is licensed under <a href="http://creativecommons.org/licenses/by-sa/4.0/?ref=chooser-v1" target="_blank" rel="license noopener noreferrer" style="display:inline-block;">CC BY-SA 4.0<img width=24 height=24 style="height:22px!important;margin-left:3px;vertical-align:text-bottom;" src="https://mirrors.creativecommons.org/presskit/icons/cc.svg?ref=chooser-v1"><img width=24 height=24 style="height:22px!important;margin-left:3px;vertical-align:text-bottom;" src="https://mirrors.creativecommons.org/presskit/icons/by.svg?ref=chooser-v1"><img width=24 height=24 style="height:22px!important;margin-left:3px;vertical-align:text-bottom;" src="https://mirrors.creativecommons.org/presskit/icons/sa.svg?ref=chooser-v1"></a></p>
