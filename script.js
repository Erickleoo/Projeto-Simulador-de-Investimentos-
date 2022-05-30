// Função pra poder pegar os dados do usuário!
function personProfile() {
  const firstName = document.querySelector('#name').value
  const age = document.querySelector('#age').value;
  const income = document.querySelector('#income').value;
  let gender = document.querySelector('input[name = "gender"]:checked').value 
  const spanName = document.querySelector('#questions h2 span').innerHTML = firstName

  //Chamando a função pra efetuar as mudanças de telas!
  show('questions', 'profile', 'page1')
}

// Função pra determinar o tipo de investimento e o perfil do usuário!
function profileAndInvest() {
  let formacao = document.querySelector('input[name = "formacao"]:checked').value;
  let produto = document.querySelector('input[name = "produto"]:checked').value;

  const perfil = {
    ultraconservador: "",
    conservador: "",
    dinamico: "",
    arrojado: "",
  };

  switch (formacao) {
    case "formacao-1":
      perfil.conservador = 0.1;
      perfil.dinamico = 0.9;
      break;
    case "formacao-2":
      perfil.dinamico = 0.35;
      perfil.arrojado = 0.65;
      break;
    case "formacao-3":
      perfil.dinamico = 0.77;
      perfil.arrojado = 0.23;
      break;
    case "formacao-4":
      perfil.conservador = 0.64;
      perfil.dinamico = 0.36;
      break;
    case "formacao-5":
      perfil.ultraconservador = 0.75;
      perfil.conservador = 0.25;
      break;
    default:
      break;
  }

  switch (produto) {
    case "produto-1":
      perfil.ultraconservador = perfil.ultraconservador + 0.6;
      perfil.conservador = perfil.conservador + 0.4;
      break;
    case "produto-2":
      perfil.dinamico = perfil.dinamico + 0.4;
      perfil.arrojado = perfil.arrojado + 0.6;
      break;
    case "produto-3":
      perfil.dinamico = perfil.dinamico + 0.22;
      perfil.arrojado = perfil.arrojado + 0.78;
      break;
    case "produto-4":
      perfil.conservador = perfil.conservador + 0.73;
      perfil.dinamico = perfil.dinamico + 0.27;
      break;
    case "produto-5":
      perfil.ultraconservador = perfil.ultraconservador + 0.6;
      perfil.conservador = perfil.conservador + 0.4;
      break;
    default:
      break;
  }

  perfil.ultraconservador = perfil.ultraconservador / 2;
    perfil.conservador = perfil.conservador / 2;
    perfil.dinamico = perfil.dinamico / 2;
    perfil.arrojado = perfil.arrojado / 2;

    let resultadoPerfil = Object.keys(perfil).sort(function (a, b) {
      return perfil[a] > perfil[b] ? -1 : perfil[b] > perfil[a] ? 1 : 0;
    })[0];

    const tipInvest = {
      rendaFixa: "Poupança, Renda fixa.",
      rendaVariavel: "Renda variável, Ações.",
    };

    let investRecomend;

    let pagesProfile;
    if (
      resultadoPerfil == "ultraconservador" ||
      resultadoPerfil == "conservador"
    ) {
      investRecomend = tipInvest.rendaFixa;
      pagesProfile = 'rendafixa'
    } else {
      investRecomend = tipInvest.rendaVariavel;
      pagesProfile =  'rendavariavel'
    }

    resultadoPerfil = capitalizeFirstLetter(resultadoPerfil)


   const spanProfile = document.querySelector(`#${pagesProfile} h2 span`).innerHTML = `${resultadoPerfil}, ${investRecomend}`
  
   show(pagesProfile, 'questions')
    
   const divResult = document.querySelector('.perfilInvest').innerHTML = `${resultadoPerfil}, ${investRecomend}`
}

// Função para simular o investimento caso seja renda fixa!
function simulateInvestFixed() {
  
  let capital = document.querySelector('#capital').value 
  let juros = document.querySelector('#juros').value / 100
  let tempInvest = document.querySelector('#tempinvest').value
  let inflacao = document.querySelector('#inflacao').value / 100
  
  // Calculo juros simples com lucro e rentabilidade

  let jurosS = capital * juros * tempInvest;
  let lucroPJS = jurosS.toFixed(2);
  let taxaJS = ((1 + (lucroPJS / capital)) / (1 + inflacao) - 1);
  let rentabilidadeJS = (capital * taxaJS);

  // Calculo juro composto com lucro e rentabilidade

  let jurosC = capital * Math.pow((1 + juros), tempInvest);
  let lucroPJC = (jurosC - capital).toFixed(2);
  let taxaJC = ((1 + (lucroPJC / capital)) / (1 + inflacao) - 1);
  let rentabilidadeJC = (capital * taxaJC);

  // Transformando todos os valores para real
  rentabilidadeJS = rentabilidadeJS.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'});
  rentabilidadeJC = rentabilidadeJC.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'});
  lucroPJS = lucroPJS.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'});
  lucroPJC = lucroPJC.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'});
  
  show('resultado', 'rendafixa', 'page3')
  
  let dadosPessoa = document.querySelector('.dados-pessoa span')

  let pessoa = profileValuesObject()

  dadosPessoa.innerHTML = `
  <h6>Nome: ${pessoa.nome}</h6>
  <h6>Sexo: ${pessoa.sexo}</h6>
  <h6>Idade: ${pessoa.idade} anos</h6>
  <h6>Renda Mensal: R$${pessoa.renda}</h6>
  `

  let simuleInvest = document.querySelector('.simule-invest span')

  simuleInvest.innerHTML = `
  <h4>Com juros simples:</h4>
  <h6>Lucro possível: R$${lucroPJS}</h6>
  <h6>Rentabilidade Real: R$${rentabilidadeJS}</h6>
  <h4>Com juros compostos:</h4>
  <h6>Lucro possível: R$${lucroPJC}</h6>
  <h6>Rentabilidade Real: R$${rentabilidadeJC}</h6>
  `
  
}

// Função para simular o investimento caso seja renda variável!
function simulateInvestVar() {
  let valorCompra = document.querySelector('#valorCompra').value;
  let valorVenda = document.querySelector('#valorVenda').value;
  let qntAcoes = document.querySelector('#qntAcoes').value;

  let rendAcao = (valorVenda / valorCompra) * 100 - 100;
  let lucroPA = (valorCompra * (rendAcao / 100) * qntAcoes);

  lucroPA = lucroPA.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'});

  show('resultado', 'rendavariavel', 'page4')

  let dadosPessoa = document.querySelector('.dados-pessoa span')

  let pessoa = profileValuesObject()

  dadosPessoa.innerHTML = `
  <h6>Nome: ${pessoa.nome}</h6>
  <h6>Sexo: ${pessoa.sexo}</h6>
  <h6>Idade: ${pessoa.idade} anos</h6>
  <h6>Renda Mensal: R$${pessoa.renda}</h6>
  `

  let simuleInvest = document.querySelector('.simule-invest span')

  simuleInvest.innerHTML = `
  <h6>Lucro possível: ${lucroPA}</h6>
  `
}

// Função pegando os valores e transformando em objetos!
function profileValuesObject() {
  const firstName = document.querySelector('#name').value
  let gender = document.querySelector('input[name = "gender"]:checked').value 
  const age = document.querySelector('#age').value;
  let income = document.querySelector('#income').value;
  
  return {
    nome: firstName,
    idade: age,
    renda: income,
    sexo: gender
  }
}

// Função para efetuar as mudanças de tela com a validação dos inputs!
function show(shown, hidden, page) {
  if (validationProfile(page) == false) {
    return false
  }

  document.getElementById(shown).style.display='block';
  document.getElementById(hidden).style.display='none';
  return false;
}

// Função onde pego os resultados da função abaixo e passando em condicionais pra saber se chegou em determinado fator
function validationProfile(pagesValidation) {
  let valid;

  switch (pagesValidation) {
    case 'page1':
      valid = validationControl.page1()
    break;
    case 'page3':
      valid = validationControl.page3()
    break
    case 'page4':
      valid = validationControl.page4()
    break
    default:
    break;
  }
  return valid
  
}

// Função onde valido os inputs das páginas!
const validationControl = {
  page1: () => {
    const firstName = document.querySelector('#name').value
    const age = document.querySelector('#age').value;
    const income = document.querySelector('#income').value;
  

    if(firstName == '' || age == '' || income == '') {
      return false
    }
  },
  page3: () => {
    let capital = document.querySelector('#capital').value 
    let juros = document.querySelector('#juros').value 
    let tempInvest = document.querySelector('#tempinvest').value
    let inflacao = document.querySelector('#inflacao').value 

    if(capital == '' || juros == '' || tempInvest == '' || inflacao == '') {
      return false
    }
  },
  page4: () => {
    let valorCompra = document.querySelector('#valorCompra').value;
    let valorVenda = document.querySelector('#valorVenda').value;
    let qntAcoes = document.querySelector('#qntAcoes').value;

    if(valorCompra == '' || valorVenda == '' || qntAcoes == '') {
      return false
    }
  }

}

//Função para que a primeira inicial de qualquer string retorne sempre como maiúscula!
function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}


