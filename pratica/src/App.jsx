import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function Produto({ nome, preco, onComprar}) {
  return(
    <div style={{ border: '1px solid #ccc', padding: '16px', margin: '10px'}}>
      <h2>{nome}</h2>
      <p>Preço: R$ {preco}</p>
      <button onClick={() => onComprar(nome)}>Adicionar ao Carrinho</button>
    </div>
  )
}

function ListaDeNomes(){
  const [nomes, setNomes] = useState([]);
  const [inputValue, setInputValue] = useState('');

  const adicionarNome = () => {
    if (inputValue.trim() !== ''){
      setNomes([...nomes, inputValue]);
      setInputValue('');
    }
  }

  return(
    <div>
      <input type="text" value={inputValue} onChange={(e) => setInputValue(e.target.value)} placeholder="Digite um nome" />
      <button onClick={adicionarNome}>Adicionar à Lista</button>

    <ul>
      {nomes.map((nome, index) => (
        <li key={index}>{nome}</li>
      ))}
    </ul>

    </div>
  )

}

function ProdutoCard({ nome, preco}) {
  return(
    <div style={{ border: '1px solid #ddd', padding: '10px', borderRadius: '8px', marginBottom: '10px'}}>
      <strong>{nome}</strong> - R$ {preco}
    </div>
  )
}

function Catalogo(){
  const [produtos, setProdutos] = useState([
    {id: 1, nome: "Teclado", preco: "150"}
  ]);

  const [novoProduto, setNovoProduto] = useState({nome: '', preco: ''});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNovoProduto({...novoProduto, [name]: value});
  }

  const adicionarAoCatalogo = () => {
    e.preventDefault();

    if (!novoProduto.nome || !novoProduto.preco) return;

    const itemFormatado = {
      ...novoProduto,
      id: Date.now()
    }
    setProdutos([...produtos, itemFormatado]);
    setNovoProduto({nome: '', preco: ''});
  }
  return(
    <div style={{ padding: '20px', fontFamily: 'sans-serif'}}>
      <h1>Gerenciar Catálogo</h1>
      <form onSubmit={adicionarAoCatalogo} style={{ marginBottom: '30px', display: 'flex', gap: '10px'}}>
        <input name="nome" placeholder="Nome do produto" value={novoProduto.nome} onChange={handleInputChange} />
        <input name="preco" type="number" placeholder="Preço" value={novoProduto.preco} onChange={handleInputChange} />
        <button type="submit">Adicionar Produto</button>
      </form>
      <hr />
      <h2>Produtos Cadstrados</h2>
      {produtos.length === 0 ? <p>Nenhum produto no catálogo.</p> : (
        produtos.map(p => (
          <ProdutoCard key={p.id} nome={p.nome} preco={p.preco} />
        ))
      )}
    </div>
  )

}

function App() {
  const avisarCompra = (item) => {
    alert(`Você clicou no produto: ${item}`);
  };

  return(
    <div>
      <h1>Minha Loja</h1>
      <Produto nome="Teclado Mecânico" preco={250} onComprar={avisarCompra}/>
      <Produto nome="Mouse Gamer" preco={150} onComprar={avisarCompra} />
      <Produto nome="Headset Gamer" preco={220} onComprar={avisarCompra} />
      <Produto nome="Monitor Gamer" preco={800} onComprar={avisarCompra} />
      <Produto nome="Controle Sony Dualsense PS5" preco={371.07} onComprar={avisarCompra} />
      <Produto nome="Jogo The Last of Us, Parte 1, PS5" preco={185.91} onComprar={avisarCompra} />

      <hr />
      <ListaDeNomes />

      <hr />
      <Catalogo />
    </div>
  );
}

function ListaProdutos () {
  const [produtos, setProdutos] = useState([]);
  const [carregando, setCarregando] = useState (true);

  useEffect(() => {
    const timer = setTimeout(() => {
      const dadosFicticios = [
        { id: 1, nome: 'Teclado Mecânico', preco: 250},
        { id: 2, nome: 'Mouse Gamer', preco: 150},
        { id: 3, nome: 'Monitor 144Hz', preco: 1200},
      ];
      setProdutos(dadosFicticios);
      setCarregando(false);
    }, 2000);
    return() => clearTimeout(timer);
  }, []);

  if (carregando) {
    return <p>Carregando produtos...</p>;
  }
  return (
    <div>
      <h2>Nossos Produtos</h2>
      <ul>
        {produtos.map(produto => (
          <li key={produto.id}>
            {produto.nome} - R$ {produto.preco}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;