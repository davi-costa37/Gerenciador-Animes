import {
    db,
    collection,
    addDoc,
    getDocs,
    updateDoc,
    deleteDoc,
    doc
}
from "./firebase.js";

const params = new URLSearchParams(window.location.search);

const listaId = params.get("id");

if(!listaId){
    alert("ID da lista não encontrado.");
    throw new Error("Sem ID");
}

let quantidadeVisivel = 8;

const btnExibirMais =
document.getElementById("btnExibirMais");

const nomeInput = document.getElementById("nome");
const totalInput = document.getElementById("episodiosTotais");
const statusInput = document.getElementById("status");

const btnAdicionar =
document.getElementById("btnAdicionar");

const listaAnimes =
document.getElementById("listaAnimes");

function progresso(assistidos, totais){

    if(totais === 0) return 0;

    return Math.round(
        (assistidos / totais) * 100
    );
}

async function carregarAnimes(){
listaAnimes.innerHTML = "";

const termo =
document
.getElementById("pesquisa")
?.value
.toLowerCase() || "";

const filtro =
document
.getElementById("filtroStatus")
?.value || "todos";

const ref = collection(
    db,
    "listas",
    listaId,
    "animes"
);

const snapshot = await getDocs(ref);

const animesFiltrados = [];

snapshot.forEach((animeDoc)=>{

    const anime = animeDoc.data();

    if(
        !anime.nome
        .toLowerCase()
        .includes(termo)
    ){
        return;
    }

    if(
        filtro !== "todos" &&
        anime.status !== filtro
    ){
        return;
    }

    animesFiltrados.push({
        id: animeDoc.id,
        anime
    });
});

if(animesFiltrados.length > quantidadeVisivel){
    btnExibirMais.style.display = "block";
}else{
    btnExibirMais.style.display = "none";
}

animesFiltrados
.slice(0, quantidadeVisivel)
.forEach(({id, anime})=>{

    const porcentagem =
    progresso(
        anime.episodiosAssistidos,
        anime.episodiosTotais
    );

    listaAnimes.innerHTML += `
    <div class="card">

        <h2>${anime.nome}</h2>

        <div class="info">
            Status: ${anime.status}
        </div>

        <div class="info">
            ${anime.episodiosAssistidos}
            /
            ${anime.episodiosTotais}
            episódios
        </div>

        <div class="progress">
            <div
                class="progress-fill"
                style="width:${porcentagem}%">
            </div>
        </div>

        <div class="info">
            ${porcentagem}%
        </div>

        <div class="actions">

            <input
                type="number"
                id="ep-${id}"
                value="${anime.episodiosAssistidos}"
                min="0"
                max="${anime.episodiosTotais}"
            >

            <button
            onclick="salvarEpisodios('${id}')">
                Salvar Episódios
            </button>

            <select
            id="status-${id}">

                <option
                value="planejado"
                ${anime.status==="planejado"?"selected":""}>
                Planejado
                </option>

                <option
                value="assistindo"
                ${anime.status==="assistindo"?"selected":""}>
                Assistindo
                </option>

                <option
                value="assistido"
                ${anime.status==="assistido"?"selected":""}>
                Assistido
                </option>

                <option
                value="pausado"
                ${anime.status==="pausado"?"selected":""}>
                Pausado
                </option>

            </select>

            <button
            onclick="salvarStatus('${id}')">
                Salvar Status
            </button>

            <button
            onclick="removerAnime('${id}')">
                Excluir
            </button>

        </div>

    </div>
    `;
});
}

btnAdicionar.addEventListener(
"click",
async ()=>{

    const nome =
    nomeInput.value.trim();

    const total =
    Number(totalInput.value);

    const status =
    statusInput.value;

    if(!nome) return;

    const ref = collection(
        db,
        "listas",
        listaId,
        "animes"
    );

    await addDoc(ref,{
        nome,
        status,
        episodiosAssistidos:0,
        episodiosTotais:total,
        nota:null
    });

    nomeInput.value="";
    totalInput.value="";

    quantidadeVisivel = 8;
    carregarAnimes();
});

window.adicionarEp =
async(id)=>{

    const ref = collection(
        db,
        "listas",
        listaId,
        "animes"
    );

    const snapshot =
    await getDocs(ref);

    snapshot.forEach(async(docSnap)=>{

        if(docSnap.id !== id) return;

        const anime = docSnap.data();

        let novoValor =
        anime.episodiosAssistidos + 1;

        if(
            novoValor >
            anime.episodiosTotais
        ){
            novoValor =
            anime.episodiosTotais;
        }

        await updateDoc(
            doc(
                db,
                "listas",
                listaId,
                "animes",
                id
            ),
            {
                episodiosAssistidos:
                novoValor
            }
        );
        quantidadeVisivel = 8;
        carregarAnimes();
    });
};

window.salvarEpisodios = async (id) => {

    const novoValor =
    Number(
      document.getElementById(`ep-${id}`).value
    );

    await updateDoc(
      doc(
        db,
        "listas",
        listaId,
        "animes",
        id
      ),
      {
        episodiosAssistidos: novoValor
      }
    );
    quantidadeVisivel = 8;
    carregarAnimes();
};

window.salvarStatus = async(id)=>{

    const novoStatus =
    document.getElementById(
        `status-${id}`
    ).value;

    await updateDoc(
        doc(
            db,
            "listas",
            listaId,
            "animes",
            id
        ),
        {
            status: novoStatus
        }
    );
    quantidadeVisivel = 8;
    carregarAnimes();
};

window.removerAnime =
async(id)=>{

    await deleteDoc(
        doc(
            db,
            "listas",
            listaId,
            "animes",
            id
        )
    );
    quantidadeVisivel = 8;
    carregarAnimes();
};

document
.getElementById("pesquisa")
.addEventListener(
"input",
(e)=>{

    const termo =
    e.target.value.toLowerCase();
    quantidadeVisivel = 8;
    carregarAnimes(termo);
});

document
.getElementById("filtroStatus")
.addEventListener(
"change",
()=>{
    quantidadeVisivel = 8;
    carregarAnimes();
});
quantidadeVisivel = 8;
carregarAnimes();

btnExibirMais.addEventListener(
    "click",
    async () => {

        quantidadeVisivel += 8;

        await carregarAnimes();

        btnExibirMais.scrollIntoView({
            behavior:"smooth",
            block:"center"
        });
    }
);