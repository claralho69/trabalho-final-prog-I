const api='/filmes';

async function carregarFilmes(){
 const res=await fetch(api);
 const filmes=await res.json();

 tabelaFilmes.innerHTML='';

 filmes.forEach(f=>{
 tabelaFilmes.innerHTML+=`
 <tr>
   <td>${f.titulo}</td>
   <td>${f.genero}</td>
   <td>${'⭐'.repeat(f.nota)}</td>
   <td>
    <button class="btn btn-warning btn-sm" onclick="editar(${f.id},'${f.titulo}','${f.genero}',${f.nota})">
      <i class="bi bi-pencil"></i>
    </button>

    <button class="btn btn-danger btn-sm" onclick="remover(${f.id})">
      <i class="bi bi-trash"></i>
    </button>
   </td>
 </tr>`;
 });
}

function editar(id,tituloFilme,generoFilme,notaFilme){
 idFilme.value=id;
 titulo.value=tituloFilme;
 genero.value=generoFilme;
 nota.value=notaFilme;
 window.scrollTo({top:0,behavior:'smooth'});
}

async function remover(id){
 if(!confirm('Deseja excluir este filme?')) return;

 await fetch(api+'/'+id,{method:'DELETE'});
 carregarFilmes();
}

formFilme.addEventListener('submit',async e=>{
 e.preventDefault();

 const filme={
  titulo:titulo.value,
  genero:genero.value,
  nota:nota.value
 };

 if(idFilme.value){
  await fetch(api+'/'+idFilme.value,{
   method:'PUT',
   headers:{'Content-Type':'application/json'},
   body:JSON.stringify(filme)
  });
 }else{
  await fetch(api,{
   method:'POST',
   headers:{'Content-Type':'application/json'},
   body:JSON.stringify(filme)
  });
 }

 formFilme.reset();
 idFilme.value='';
 carregarFilmes();
});

carregarFilmes();
