import { useState, useEffect } from 'react';
import { ProdutoCard } from './components/ProdutoCard';

function App(){
  const [produtos, setProdutos] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [novoProduto, setNovoProduto] = useState({ nome: '', preco: ''});

  useEffect(() => {
    const timer = setTimeout(() => {
      const dadosIniciais = [
        { id: 1, nome: 'Teclado Mecânico', preco: 250},
        {id: 2, nome: 'Mouse Gamer', preco: 150},
      ];
      setProdutos(dadosIniciais);
      setCarregando(false);
    }, 2000);
    return() => clearTimeout(timer);
  }, []);
  const adicionarAoCatalogo = (e) => {
    e.preventDefault();
    if (!novoProduto.nome || !novoProduto.preco) return;

    const itemFormatado = {
      ...novoProduto,
      id: Date.now(),
      preco: parseFloat(novoProduto.preco)
    };
    setProdutos([...produtos, itemFormatado]);
    setNovoProduto({ nome: '', preco: ''});
  };

  return(
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto'}}>
      <h1>Gerenciar Catalogo</h1>

      {/* Formulário de Cadastro */}
      <form onSubmit={adicionarAoCatalogo} style={{ marginBottom: '30px', display: 'flex', flexDirection: 'column', gap: '10px'}}>
        <input
        name="nome"
        placeholder="Nome do produto"
        value={novoProduto.nome}
        onChange={(e) => setNovoProduto({...novoProduto, nome: e.target.value})}
        />
        <input
        name="preco"
        type="number"
        placeholder="Preço"
        value={novoProduto.preco}
        onChange={(e) => setNovoProduto({...novoProduto, preco: e.target.value})}
        />
        <button type='submit'>Cadastrar Produto</button>
      </form>

      <hr />

      <h2>Produtos Disponíveis</h2>
      {carregando ? (
        <p>Carregando catalogo...</p>
      ) : (
        produtos.map(p => (
          <ProdutoCard key={p.id} nome={p.nome} preco={p.preco} />

        ))
      )}
    </div>
  );
}

export default App;