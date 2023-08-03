export function validarSenha(senha) {
    // Verifica se a senha tem pelo menos 8 caracteres
    if (senha.length < 8) {
        return true;
    }

    // Verifica se a senha contém pelo menos um caractere especial
    const caractereEspecial = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\|]/;
    if (!caractereEspecial.test(senha)) {
        return true;
    }

    // Verifica se a senha contém pelo menos uma letra maiúscula
    const letraMaiuscula = /[A-Z]/;
    if (!letraMaiuscula.test(senha)) {
        return true;
    }

    // Se todos os critérios forem atendidos, a senha é válida
    return false;
}

export function validarEmail(email) {
    var re = /\S+@\S+\.\S+/;
    return !re.test(email);
}

export function validarTextoEmBranco(texto = '') {
    return texto.trim() === '';
}
