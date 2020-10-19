# Introdução
Um bot de Discord feito no Node.js para auxiliar as reuniões remotas do PET Engenharia de Computação da Ufes.

## :ledger: Índice

- [Sobre](#beginner-sobre)
  - [Comandos](#mega-comandos)
- [Uso](#zap-uso-do-código)
  - [Instalação](#electric_plug-instalação)
  - [Ativação](#package-ativação)
- [Desenvolvimento](#wrench-desenvolvimento)
  - [Pré-Requisitos](#notebook-pré-requisitos)
  - [Ambiente de Desenvolvimento](#nut_and_bolt-ambiente-de-desenvolvimento)
- [Contribuição](#fire-contribuição) 
- [Créditos](#star2-créditos)

##  :beginner: Sobre
O bot foi elaborado seguindo a estrutura das reuniões do grupo PET EngComp. Isso significa, por exemplo, que os pontos de pauta permanecem de uma reunião para outra.  
Sua construção foi um primeiro contato com a biblioteca Discord.js, portanto podem haver alguns bugs. Caso isso ocorra (como spam em algum canal), é sugerido que o bot seja removido do servidor do Discord e o bug seja reportado à equipe de desenvolvimento.  
Não utilize este código como referência para o desenvolvimento de um bot para Discord. Em vez disso referencie [Desenvolvimento](#wrench-desenvolvimento)!

### :mega: Comandos
```!help``` - Envia os comandos do bot, com explicações sobre cada um.   
```!bday <DD/MM/AAAA>``` - Salva a data de nascimento escrita como o aniversário de quem mandou a mensagem. Quando for aniversário da pessoa, o bot enviará uma mensagem de feliz aniversário com a idade (por isso o ano deve ser passado também).   
```!vote <título>``` - Inicia uma votação com as opções "Sim", "Não" e "Abstensão". A votação durará uma quantidade de segundos pré determinada.  
```!poll <título>, <número de votos por pessoa>, <opção 1>, <opção 2>, ...``` - Inicia uma votação com as opções passadas (máximo de 10 opções). Também é possível definir em quantas opções cada um pode votar em (número de votos por pessoa). A votação durará uma quantidade de segundos pré determinada.   
```!settings``` - Configura aspectos do bot no servidor. Deve ser usado como alguma das opções abaixo:  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;```!settings maxtime <tempo em segundos>``` - Altera o tempo máximo para os 2 tipos de votação. O limite é 600 segundos.  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;```!settings maxmsg <número de mensagens>``` - Altera o máximo de mensagens enviadas durante uma reunião até que a pauta seja reenviada pelo bot, a fim de que ela não fique perdida no canal de texto. O padrão é 10 mensagens.  

```!meeting``` - Inicia a reunião. Para usar o comando, a pessoa deve estar em um canal de voz. A pauta salva será enviada (e fixada no canal) assim como os encaminhamentos salvos. Os pontos de pauta poderão ser navegados usando as reações na mensagem (🔼, 🔽) e ❌ finaliza a reunião.    
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;```!meeting <nome de um cargo do servidor>``` - Inicia a reunião como o comando anterior, mas desta vez verificando se todos com o cargo estão no canal de voz. O cargo não pode conter espaços.  
> 👉🏼 **Dica:** Dê um cargo com o nome *Petiano* a todos e use esse comando para verificar se todos estão presentes!

```!reminder <encaminhamento1> ; <encaminhamento2> ; ...``` - Adiciona encaminhamentos para serem verificados na próxima reunião. Toda vez que esse comando é usado os encaminhamentos são sobrepostos, então para alterar algo basta usá-lo novamente. Lembre-se de separá-los usado ponto-e-vírgula (diferente dos comandos anteriores). 

> 👉🏼 **Dica:** Após a revisão da ata, peça para que a escreveu apenas copiar e colar os encaminhamentos no comando, colocando ponto-e-vírgula no final de cada ponto.

```!mktopic <topico 1>, <topico 2>, ...``` - Adiciona os tópicos na pauta. Todos os pontos são substituidos quando esse comando é usado. 

```!mksubtopic <topico 1>, <subtopico 1.1>, <subtopico 1.2>...; <topico 2>, <subtopico 2.1>, <subtopico 2.2>,...``` - Adiciona os subtópicos  no tópico especificado da pauta (case sensitive). 

```!rmtopic <topico 1>, <topico 2>, ...``` - Remove os tópicos citados da pauta.  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;```!rmtopic *``` - Remove todos os pontos, esvaziando a pauta. 

```!rmsubtopic <topico 1>, <subtopico 1.1>, <subtopico 1.2>, ...; <topico 2>, <subtopico 2.1>, <subtopico 2.2>, ...``` - Remove os subtópicos no tópico especificado da pauta (case insensitive).
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;```!rmsubtopic <topico 1>, *; <topico 2>, * ``` - Remove todos subtópicos de determinado tópico. 
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;```!rmtopic *``` Remove todos os subtópicos, deixando os tópicos vazios.

## :zap: Uso do código
**ATENÇÃO:** Este projeto não pode ser executado localmente, por enquanto. Há variáveis de ambiente no arquivo .env necessárias para seu funcionamento correto e que não devem ser adicionadas ao git. Com a formalização do ambiente de execução do bot e criação de contas adequadas, elas ficarão disponíveis.

###  :electric_plug: Instalação
1. Clone o repositório como preferir

```
git clone git@github.com:petengcomp/petbot.git
```
ou
```
git clone https://github.com/petengcomp/petbot.git
```
2. Acesse a pasta e instale as dependências necessárias

```
cd petbot
npm i
```

###  :package: Ativação
1. Primeiro crie o banco de dados usando  

```
node .\data\dbInit.js
```
2. Ative o bot
- Indefinidamente

```
node index.js
```
- Em ambiente de desenvolvimento

```
npm run dev
```
##  :wrench: Desenvolvimento

### :notebook: Pré-Requisitos
É necessário conhecimento de javascript para trabalhar neste bot. O conhecimento específico sobre o módulo Discord.js pode ser encontrado em sua [documentação](https://discord.js.org/#/docs/main/stable/general/welcome) e um guia geral e detalhado sobre a criação de bots pode ser achado [aqui](https://discordjs.guide/).

###  :nut_and_bolt: Ambiente de Desenvolvimento
É apenas necessário ter Node.js instalado. O ambiente inicial é bem explicado no [guia](https://discordjs.guide/preparations/).

##  :fire: Contribuição

Para participar da produção do bot.

1. **Reportar a bug**   
Se você encontrou um bug durante a utilização do bot, faça uma issue [aqui](https://github.com/petengcomp/petbot/issues/new), coloque "Bug" em Labels.

2. **Sugerir uma adição**   
Se você sugerir uma nova função para o bot, faça uma issue [aqui](https://github.com/petengcomp/petbot/issues/new), coloque "Enhancement" em Labels.

## :star2: Créditos
Produzido pelo [PET EngComp Ufes](https://pet.inf.ufes.br/)
