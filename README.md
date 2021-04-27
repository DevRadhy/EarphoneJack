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
```

após configurar essas variáveis você pode iniciar o projeto com todas as funcionalidades.

### Rodando o projeto

Depois de instalar as dependêcias e configurar as variáveis de ambiente, basta usar o seguinte comando para iniciar o projeto.

```bash
npm run dev
# ou yarn dev
```

quando o bot estiver on e pronto para ser usando você verá um log no terminal com a menssagem `Ready!`.

> 💡 Se você ficou interessado no projeto e quer saber mais, ou tem algo para dizer, você pode abrir uma issue.
