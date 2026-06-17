const api = '/filmes';
let filmesLocais = [];

async function carregarFilmes() {
    try {
        const res = await fetch(api);
        filmesLocais = await res.json();

        const tabelaFilmes = document.getElementById('tabelaFilmes');
        tabelaFilmes.innerHTML = '';

        filmesLocais.forEach(f => {
            const tr = document.createElement('tr');
            
            tr.innerHTML = `
                <td></td>
                <td></td>
                <td>${'⭐'.repeat(Number(f.nota))}</td>
                <td>
                    <button class="btn btn-warning btn-sm btn-editar" data-id="${f.id}">
                        <i class="bi bi-pencil"></i>
                    </button>
                    <button class="btn btn-danger btn-sm btn-remover" data-id="${f.id}">
                        <i class="bi bi-trash"></i>
                    </button>
                </td>
            `;

            tr.children[0].textContent = f.titulo;
            tr.children[1].textContent = f.genero;
            
            tabelaFilmes.appendChild(tr);
        });

        document.querySelectorAll('.btn-editar').forEach(btn => {
            btn.addEventListener('click', () => prepararEdicao(btn.dataset.id));
        });

        document.querySelectorAll('.btn-remover').forEach(btn => {
            btn.addEventListener('click', () => remover(btn.dataset.id));
        });

    } catch (error) {
        console.error("Erro ao carregar filmes:", error);
    }
}

function prepararEdicao(id) {
    const filme = filmesLocais.find(f => f.id == id);
    if (!filme) return;

    document.getElementById('idFilme').value = filme.id;
    document.getElementById('titulo').value = filme.titulo;
    document.getElementById('genero').value = filme.genero;
    document.getElementById('nota').value = filme.nota;
    
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

async function remover(id) {
    if (!confirm('Deseja excluir este filme?')) return;

    try {
        await fetch(`${api}/${id}`, { method: 'DELETE' });
        carregarFilmes();
    } catch (error) {
        console.error("Erro ao remover:", error);
    }
}

document.getElementById('formFilme').addEventListener('submit', async e => {
    e.preventDefault();

    const idFilme = document.getElementById('idFilme').value;
    const filme = {
        titulo: document.getElementById('titulo').value,
        genero: document.getElementById('genero').value,
        nota: Number(document.getElementById('nota').value)
    };

    try {
        if (idFilme) {
            await fetch(`${api}/${idFilme}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(filme)
            });
        } else {
            await fetch(api, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(filme)
            });
        }

        document.getElementById('formFilme').reset();
        document.getElementById('idFilme').value = '';
        carregarFilmes();
    } catch (error) {
        console.error("Erro ao salvar:", error);
    }
});

carregarFilmes();
