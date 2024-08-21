const fs = require('fs');
const path = require('path');

// Função para adicionar zeros à esquerda
function adicionarZerosEsquerda(nome, quantidade) {
    return '0'.repeat(quantidade - nome.length) + nome;
}

// Função para percorrer recursivamente as pastas
function percorrerPastas(caminho) {
    // Lê o conteúdo do diretório
    fs.readdir(caminho, (err, arquivos) => {
        if (err) {
            console.error('Erro ao ler o diretório:', err);
            return;
        }

        // Itera sobre os arquivos encontrados
        arquivos.forEach(arquivo => {
            // Cria o caminho completo do arquivo
            const caminhoCompleto = path.join(caminho, arquivo);

            // Verifica se é um diretório
            fs.stat(caminhoCompleto, (err, stats) => {
                if (err) {
                    console.error('Erro ao obter as estatísticas do arquivo:', err);
                    return;
                }

                if (stats.isDirectory()) {
                    // Verifica o nome da pasta e adiciona zeros à esquerda se necessário
                    const nomePasta = arquivo;
                    if (nomePasta.length < 6) {
                        const novoNomePasta = adicionarZerosEsquerda(nomePasta, 6);
                        fs.renameSync(caminhoCompleto, path.join(caminho, novoNomePasta));
                        console.log(`Pasta renomeada: ${nomePasta} -> ${novoNomePasta}`);

                        // Chama a função recursivamente com o novo nome da pasta
                        percorrerPastas(path.join(caminho, novoNomePasta));
                    } else {
                        // Chama a função recursivamente com o nome atual da pasta
                        percorrerPastas(path.join(caminho, nomePasta));
                    }
                } else {
                    // Se for um arquivo, imprime o caminho
                    console.log('Arquivo:', caminhoCompleto);
                }
            });
        });
    });
}

// Caminho inicial para começar a busca
const caminhoInicialWin = 'C:\\Caminho\\Para\\Sua\\Pasta';
// const caminhoInicialLinux = '/home/vitorroliveiraa/dev/testRename';

// Chama a função para iniciar a busca
percorrerPastas(caminhoInicialWin);
