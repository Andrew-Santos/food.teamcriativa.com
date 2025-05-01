
// Função para carregar os produtos
async function carregarProdutos() {
    try {
        // Carrega categorias
        const { data: categorias, error: errorCategorias } = await supabase
            .from('categoria')
            .select('*')
            .eq('pausar', false)
            .order('ordem', { ascending: true });

        if (errorCategorias) {
            console.error('Erro ao carregar categorias:', errorCategorias);
            return;
        }

        // Carrega produtos
        const { data: produtos, error: errorProdutos } = await supabase
            .from('produto')
            .select('*')
            .eq('status', true)
            .order('ordem', { ascending: true });

        if (errorProdutos) {
            console.error('Erro ao carregar produtos:', errorProdutos);
            return;
        }

        // Proteção adicional
        if (!produtos || !categorias) {
            console.error('Produtos ou categorias vieram vazios.');
            return;
        }


        // Filtra produtos que têm categorias existentes
        const produtosFiltrados = produtos.filter(produto => 
            categorias.some(cat => cat.id === produto.categoria)
        );

        // Filtra categorias que têm produtos
        const categoriasComProdutos = categorias.filter(categoria => 
            produtosFiltrados.some(prod => prod.categoria === categoria.id)
        );

        // Atualiza o menu de navegação
        const nav = document.querySelector('nav');
        nav.innerHTML = '';
        
        categoriasComProdutos.forEach(categoria => {
            const divCategoria = document.createElement('div');
            divCategoria.className = 'menu-cardapio';
            divCategoria.textContent = categoria.categoria;
            divCategoria.onclick = () => scrollToCategoria(categoria.id);
            nav.appendChild(divCategoria);
        });

        // Limpa o container
        const containerCardapio = document.getElementById('container-cardapio');
        containerCardapio.innerHTML = '';

        // Processa cada categoria com produtos
        categoriasComProdutos.forEach(categoria => {
            const produtosDaCategoria = produtosFiltrados.filter(
                p => p.categoria === categoria.id
            );
            
            const section = document.createElement('section');
            section.id = `categoria-${categoria.id}`;
            section.className = 'categoria-item';
            
            const h2 = document.createElement('h2');
            h2.textContent = categoria.categoria;
            section.appendChild(h2);
            
            const gridCombos = document.createElement('div');
            gridCombos.className = 'grid-combos';
            
            // Processa cada produto da categoria
            produtosDaCategoria.forEach(produto => {
                const boxMaster = document.createElement('div');
                boxMaster.className = 'box-master';
                
                // Container da imagem
                const containerImg = document.createElement('div');
                containerImg.className = 'container-img';
                
                const img = document.createElement('img');
                img.alt = produto.produto;
                img.src = produto.foto ? produto.foto + (produto.foto.includes('?') ? '' : `?${Date.now()}`) : 'images/carregando-foto.png';
                img.onerror = () => img.src = 'images/carregando-foto.png';
                
                containerImg.appendChild(img);
                boxMaster.appendChild(containerImg);
                
                // Descrição do produto
                const descricaoDiv = document.createElement('div');
                descricaoDiv.className = 'descricao-combo';
                
                const h3 = document.createElement('h3');
                h3.className = 'nome-combo';
                h3.textContent = produto.produto;
                descricaoDiv.appendChild(h3);
                
                const p = document.createElement('p');
                p.className = 'descricao-combo';
                p.textContent = produto.descricao;
                descricaoDiv.appendChild(p);
                
                boxMaster.appendChild(descricaoDiv);
                
                // Área de compra
                const compraDiv = document.createElement('div');
                compraDiv.className = 'compra-combo';
                
                const precoDiv = document.createElement('div');
                precoDiv.className = 'preco-combo';
                precoDiv.textContent = `R$ ${produto.preco.toFixed(2).replace('.', ',')}`;
                compraDiv.appendChild(precoDiv);
                
                const carrinhoDiv = document.createElement('div');
                carrinhoDiv.className = 'comprar-carrinho';
                carrinhoDiv.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-shopping-cart-icon lucide-shopping-cart"><circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/></svg>`;
                carrinhoDiv.onclick = () => adicionarAoCarrinho(produto);
                compraDiv.appendChild(carrinhoDiv);
                
                boxMaster.appendChild(compraDiv);
                gridCombos.appendChild(boxMaster);
            });
            
            section.appendChild(gridCombos);
            containerCardapio.appendChild(section);
        });

    } catch (error) {
        console.error('Erro ao carregar produtos:', error);
    }
}

// Funções auxiliares (mantidas iguais)
function scrollToCategoria(categoriaId) {
    const elemento = document.getElementById(`categoria-${categoriaId}`);
    if (elemento) elemento.scrollIntoView({ behavior: 'smooth' });
}


// Inicialização
document.addEventListener('DOMContentLoaded', carregarProdutos);
