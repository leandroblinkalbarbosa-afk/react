export function ProdutoCard({ nome, preco}) {
    return(
        <div style={{ border: '1px solid #ddd', padding: '10px', borderRadius: '8px', marginBottom: '10px'}}>
            <strong>{nome}</strong> - R$ {Number(preco).toFixed(2)}
        </div>
    );
}