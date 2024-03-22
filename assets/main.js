function ValidaCPF(cpfEnviado) {
    Object.defineProperty(this, 'cpfLimpo', {
        enumerable: true,
        get: function() {
            return cpfEnviado.replace(/\D+/g, '');
        }
    });
}

ValidaCPF.prototype.criaDigito = function(cpfParcial) {
    let cpfArray = Array.from(cpfParcial)
    let regressivo = cpfArray.length + 1;
    const total = cpfArray.reduce((ac, val) => {
        ac += (val * regressivo)
        regressivo--;
        return ac;
    }, 0)

    const digito = 11 - (total % 11);
    return digito > 9 ? '0' : String(digito);
}

ValidaCPF.prototype.isSequencia = function() {
    const sequencia = this.cpfLimpo[0].repeat(this.cpfLimpo.length);
    return sequencia === this.cpfLimpo;
}

ValidaCPF.prototype.valida = function() {
    if(!this.cpfLimpo) return false;
    if(this.cpfLimpo.length !== 11) return false;
    if(this.isSequencia() === true) return false;

    const cpfParcial = this.cpfLimpo.slice(0, -2);
    const digito1 = this.criaDigito(cpfParcial)
    const digito2 = this.criaDigito(cpfParcial + digito1);
    const novoCPF = cpfParcial + digito1 + digito2;
    return novoCPF === this.cpfLimpo;
}

const button = document.querySelector('button');
const p = document.querySelector('p');
let inputCPF = document.querySelector('input').focus();

document.addEventListener('keyup', function(e) {
    if(e.keyCode === 13) {
        inputCPF = document.querySelector('input').value
        const cpf = new ValidaCPF(inputCPF);
        if(cpf.valida()) {
             p.innerHTML = 'Acesso autorizado'
             p.style.color = 'black'
        } else {
            p.innerHTML = 'Acesso negado, CPF inválido'
            p.style.color = 'red';    
        }
    }
})

button.addEventListener('click', function() {
    const inputCPF = document.querySelector('input').value
    const cpf = new ValidaCPF(inputCPF);
    if(cpf.valida()) {
        p.innerHTML = 'Acesso autorizado'
        p.style.color = 'black'
    } else {
        p.innerHTML = 'Acesso negado, CPF inválido'
        p.style.color = 'red';    
    }
})

