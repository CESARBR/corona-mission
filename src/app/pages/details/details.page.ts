import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
// import { CallNumber } from '@ionic-native/call-number/ngx';
import { Storage } from '@ionic/storage';
import { NavController } from '@ionic/angular';
import { ThrowStmt } from '@angular/compiler';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {

  private readonly STATUS_UNCHECK = "ellipse-outline";
  private readonly STATUS_CHECK = "checkmark-outline";

  data: any;
  person: any;
  challenges: any;
  SampleJson: any;
  persons: any;

  countMissions: number;

  constructor(private route: ActivatedRoute, private storage: StorageService, private navCtrl: NavController) { 
    
  }

  ngOnInit() {
    this.SampleJson = [
      {
          "id": 1,
      "title": "Fazer uma receita",
          "description": "Que tal fazer uma video chamada e cozinhar juntos? 🍳 Coloque o telefone numa video chamada em um lugar fixo que continue filmando você e 'mãos na massa'!",
          "icon": "fast-food",
        "status": "ellipse-outline"
    },
      {
          "id": 2,
      "title": "Encontre fotos",
          "description": "Crie um momento para procurar álbuns antigos e revisitar memórias! Conhecer a história das pessoas que gostamos é sempre muito interessante.",
          "icon": "image",
        "status": "ellipse-outline"
    },
      {
          "id": 3,
      "title": "Memórias felizes",
          "description": "Nossas mémorias nos fazem ser quem somos.☺️💭 Não seria legal resgatar alguns desses momentos que nos deixam felizes?",
          "icon": "chatbubbles",
        "status": "ellipse-outline"
    },
      {
          "id": 4,
      "title": "Música da infância",
          "description": "Uma boa trilha sonora nos faz viajar no tempo e espaço! Compartilhe uma canção antiga para lembrar de pessoas, lugares e emoções. 🎶👨‍🎤💃🏽🕺🏻",
          "icon": "musical-notes",
        "status": "ellipse-outline"
    },
      {
          "id": 5,
      "title": "Vejam o mesmo video",
          "description": "▶ Compartilhe um vídeo do YouTube que achar interessante e conversem sobre ele. Qual o conteúdo? O objetivo do vídeo? O que acharam mais legal ou questionável?",
          "icon": "play-circle",
        "status": "ellipse-outline"
    },
      {
          "id": 6,
      "title": "Recomendar meditação",
          "description": "Meditar pode nos ajudar a passar por momentos difíceis e manter os pensamentos no lugar. 💭Que tal recomendar um vídeo de meditação e, após a prática, conversar sobre as sensações experienciadas? 🧘",
          "icon": "flower",
        "status": "ellipse-outline"
    },
      {
          "id": 7,
      "title": "Jogue 21 perguntas",
          "description": "Pense em um objeto e o seu contato terá até 21 perguntas para advinhá-lo. Se a pessoa não conseguir adivinhar em 21 perguntas, ela perde. E aí, quem será o mais esperto? Esse jogo é simples e pode ser jogado através de uma ligação 📞.",
          "icon": "flower",
        "status": "ellipse-outline"
    },
      {
          "id": 8,
      "title": "Jogo do ABC",
          "description": "Vamos testar a memória com o jogo do ABC? Vocês devem pensar em uma palavra que comece com cada letra do alfabeto, começando pela letra A. Cada pessoa deve repetir as palavras que já foram ditas antes de falar uma palavra nova.",
          "icon": "flower",
        "status": "ellipse-outline"
    },
      {
          "id": 9,
      "title": "Jogo de dama ou xadrez",
          "description": "Com um tabuleiro de damas ou xadrez, compartilhe as jogadas informando a posição inicial e final das jogadas e desfrutem de uma boa partida. Por exemplo: peão da casa A1 realiza jogada para a cada A2. Bom jogo!",
          "icon": "flower",
        "status": "ellipse-outline"
    },
      {
          "id": 10,
      "title": "Compartilhar refeição",
          "description": "Realize uma chamada com o idoso em um horário de refeição, seja no café da manhã, no almoço, no jantar ou mesmo em um intervalo de lanche. Falem sobre o sabor da comida, suas preferência, como foi o preparo e coisas que fizeram durante o dia, e não esqueça de brindar!",
          "icon": "fast-food",
        "status": "ellipse-outline"
    },
      {
          "id": 11,
      "title": "Jogo do dicionário",
          "description": "📕 Essse jogo é bem simples e exige apenas um dicionário. Para jogar, uma pessoa deve abrir o dicionário em uma página aleatória e a outra tem que tentar adivinhar qual o significado da palavra.",
          "icon": "book",
        "status": "ellipse-outline"
    },
      {
          "id": 12,
      "title": "Jogue Adedonha",
          "description": "Nessa brincadeira, a ideia é sortear uma letra e dizer o maximo de nomes de lugares (cidades, estados e países) começando com essa letra. Aposto que você está com medo perder essa! 😁",
          "icon": "flower",
        "status": "ellipse-outline"
    },
      {
          "id": 13,
      "title": "Conversar sobre séries",
          "description": "Indicações de séries são sempre bem vindas. Que tal contar um pouco sobre a última série que você viu e pedir indicações para essa pessoa?",
          "icon": "chatbubbles",
        "status": "ellipse-outline"
    },
      {
          "id": 14,
      "title": "Dê uma de filosofo",
          "description": "Já ouviu falar de nova acropole? 🤓 🧐 É uma instituição internacional com sedes em diversos paises onde professores voluntários ensinam e discutem a fisolofia aplicada na prática do dia-a-dia. Tem no Spotify e Youtube! Busque por: 'Justiça Nova acropole' no google ou spotify.",
          "icon": "chatbubbles",
        "status": "ellipse-outline"
    },
      {
          "id": 15,
      "title": "Peça um conselho",
          "description": "Converse e discuta com o idoso sobre algo que queira compartilhar e solicitar conselho, escute sobre a opinião do idoso em relação a um problema que esteja enfrentando no momento, afinal de contas a experiência conta muito!",
          "icon": "chatbubbles",
        "status": "ellipse-outline"
    },
      {
          "id": 16,
      "title": "Chamada em grupo",
          "description": "Encoraje o seu contato a te apresentar para um amigo de longa data. Além de ter uma conversa boa, a pessoa poderá ter contato com alguém de realidade parecida.",
          "icon": "call",
        "status": "ellipse-outline"
    },
      {
          "id": 17,
      "title": "Compre mantimentos",
          "description": "Entre em contato com o idoso e pergunte se ele está precisando de um remédio ou comida, em caso positivo providencie o item desejado e faça a entrega ao idoso, ele ficará muito contente em saber que pode contar com você!",
          "icon": "medkit",
        "status": "ellipse-outline"
    },
      {
          "id": 18,
      "title": "Ler um livro juntos",
          "description": "Escolha um livro de interesse e compartilhem sua leitura, ou em conjunto ou discutindo sobre os capítulos já lidos, e criem suposições do que está pela frente. O que será que acontece no final?",
          "icon": "book",
        "status": "ellipse-outline"
    },
      {
          "id": 19,
      "title": "Palavra cruzada",
          "description": "Você pode achar um jogo online de palavras cruzadas e preencher juntos por telefone.",
          "icon": "flower",
        "status": "ellipse-outline"
    },
      {
          "id": 20,
      "title": "Contar histórias",
          "description": "Escreva vários temas em papéis pequenos e depois faça um sorteio. Se o tema sorteado for carnaval, por exemplo, você deve e a pessoa devem contar alguma história divertida de carnaval. É uma boa forma de compartilhar aquelas histórias engraçadas que amamos contar.",
          "icon": "chatbubbles",
        "status": "ellipse-outline"
    },
      {
          "id": 21,
      "title": "Ensinar receita",
          "description": "Que tal aprender uma receita? Peça para o seu contato te ensinar uma receita e, além de trocar uma ideia, você pode comer algo gostoso depois.",
          "icon": "fast-food",
        "status": "ellipse-outline"
    },
      {
          "id": 22,
      "title": "Regar plantas",
          "description": "Converse sobre plantas enquanto as rega. Além de um bom papo, as suas plantinhas agradecem. 🌱",
          "icon": "leaf",
        "status": "ellipse-outline"
    },
      {
          "id": 23,
      "title": "Brincar de forca",
          "description": "Brinquem de forca, estabeleça um tema, e escolha uma palavra, informe o número de letras, e tentem adivinhar qual a palavra informando letras, o jogador tem 6 tentativas que simbolizam as parte do corpo de um personagem na forca: cabeça, tronco, e membros",
          "icon": "flower",
        "status": "ellipse-outline"
    },
      {
          "id": 24,
      "title": "Quem sou eu?",
          "description": "Escolha um personagem famoso e descreva suas características físicas e sociais. O seu contato deve adivinhar quem é o personagem.",
          "icon": "help",
        "status": "ellipse-outline"
    },
      {
          "id": 25,
      "title": "Fazer atividade física",
          "description": "Iniciem uma chamada em vídeo e compartilhem uma atividade física simples ou alongamento com o idoso, respeitando suas limitações físicas",
          "icon": "barbell",
        "status": "ellipse-outline"
    },
      {
          "id": 26,
      "title": "Hora da arte",
          "description": "Iniciem uma chamada de vídeo e orientem como fazer algumas atividades artesanais. Costura, Crochê, flores, origami...",
          "icon": "flower",
        "status": "ellipse-outline"
    },
      {
          "id": 27,
      "title": "Estimule a leitura",
          "description": "Leia um poema ou texto interessante para o seu contato e peça para ele(a) fazer o mesmo!",
          "icon": "book",
        "status": "ellipse-outline"
    },
      {
          "id": 28,
      "title": "Relembrar é viver",
          "description": "Estimule o idosos a contar um pouco das suas histórias de vida",
          "icon": "chatbubbles",
        "status": "ellipse-outline"
    },
      {
          "id": 29,
      "title": "Sorria 📸",
          "description": "Tire uma foto legal do seu dia e compartilhe com quem você gosta",
          "icon": "camera",
        "status": "ellipse-outline"
    },
      {
          "id": 30,
      "title": "Cuidar do jardim",
          "description": "Lembre o seu contato de cuidar das plantinhas! 🌿 Essa atividade requer atenção e pode ajudar no combate à ansiedade.",
          "icon": "leaf",
        "status": "ellipse-outline"
    },
      {
          "id": 31,
      "title": "Dê boas notícias 🗞,Tranquilize o seu contato em relação à pandemia.", 
          "description": "Procure nos jornais uma boa notícia recente sobre o COVID-19 e compartilhe com ele(a) em tom otimista.",
          "icon": "newspaper",
        "status": "ellipse-outline"
      }
  ];
    this.person = null;
    if (this.route.snapshot.data['special']) {
      this.data = this.route.snapshot.data['special'];
      this.storage.getPersons().then((val) => {
        this.persons = val;
        if (val === null) {
        } else {
          let index = 0;
          for (let i = 0; i < this.persons.length; i++) {
            if (this.persons[i].id == this.data) {
              this.person = this.persons[i];
              index = i;
            }
          }
         
          if (this.person.challenges === undefined || this.person.challenges === null) {
            this.challenges = [this.SampleJson[Math.floor((Math.random() * this.SampleJson.length) + 0)],
            this.SampleJson[Math.floor((Math.random() * this.SampleJson.length) + 0)],
            this.SampleJson[Math.floor((Math.random() * this.SampleJson.length) + 0)]];
            this.person.challenges = this.challenges;
            this.persons[index] = this.person;
            this.storage.setPersons(this.persons);
          }
        }
        this.updateCountMissions();
      });
    }

  }

  getThreeChallenges() {
    return [this.SampleJson[Math.floor((Math.random() * this.SampleJson.length) + 0)],
    this.SampleJson[Math.floor((Math.random() * this.SampleJson.length) + 0)],
    this.SampleJson[Math.floor((Math.random() * this.SampleJson.length) + 0)]];
  }

  shuffle(array) {
    let currentIndex = array.length, temporaryValue, randomIndex;
  
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
  
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
  
      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
  
    return array;
  }

  moreChallenges() {
    let count = 3
    let j = 0;
    while (j < count) {
      let newChallenge = this.SampleJson[Math.floor((Math.random() * this.SampleJson.length) + 0)];
      let notFound = true;
      for (let i = 0; i < this.person.challenges.length; i++) {
        if (this.person.challenges[i].id == newChallenge.id) {
          notFound = false;
        }
      }
      if (notFound) {
        this.person.challenges.push(newChallenge);
        j++;
      }
      if (this.person.challenges.length === this.SampleJson.length) {
        break;
      }
    }
    this.person.challenges = this.shuffle(this.person.challenges);
    for (let i = 0; i < this.persons.length; i++) {
      if (this.persons[i].id == this.person.id) {
        this.persons[i] = this.person;
        this.storage.setPersons(this.persons);
      }
    }
    
  }

  

  call() {
    console.log("TODO");
    // this.callNumber.callNumber(this.person.phone, true)
    // .then(res => console.log('Launched dialer!', res))
    // .catch(err => console.log('Error launching dialer', err));
  }

  updatePerson(id) {
    for (let i = 0; i < this.persons.length; i++) {
      if (this.persons[i].id == id) {
        console.log("found id " + i)
        this.persons.splice(i, 1);
      }
    }
    this.storage.setPersons(this.persons);

    this.navCtrl.setDirection("back");
    this.navCtrl.navigateForward('home');
  }

  editPerson(id) {
    this.navCtrl.setDirection('forward');
    this.navCtrl.navigateForward('details/'+ id +'/edit')
  }

  changeStatus(challenge) {
    for (let i = 0; i < this.person.challenges.length; i++) {
      if (this.person.challenges[i].id === challenge.id) {
        if (challenge.status == this.STATUS_CHECK) {
          this.person.challenges[i].status = this.STATUS_UNCHECK;

        } else {
          this.person.challenges[i].status = this.STATUS_CHECK;
        }
      }
    }
    for (let i = 0; i < this.persons.length; i++) {
      if (this.persons[i].id == this.person.id) {
        this.persons[i] = this.person;
      }
    }

    this.updateCountMissions();

    this.storage.setPersons(this.persons);
  }

  private updateCountMissions() {
    this.countMissions = this.person.challenges.filter(c => c.status === this.STATUS_CHECK).length;
  }
}
