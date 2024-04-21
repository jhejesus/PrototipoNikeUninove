document.addEventListener("DOMContentLoaded", function() {
    var addButton = document.getElementById("addButton");
    var modal = document.getElementById("modal");
    var checkBoxAdded = false;

    addButton.addEventListener("click", function() {
        modal.style.display = "block";
        resetForm();
        document.getElementById("codigoProdutoInput").focus();
        const btnEstoque = document.getElementById("btnEstoque");
    const tabelaItensBtn = document.getElementById("tabelaItens");
    const tabelaParceiros = document.getElementById("tabelaParceiros");

    btnEstoque.addEventListener("click", function() {
        tabelaItensBtn.style.display = "table";
        tabelaParceiros.style.display = "none";
    });
    });

    
    var closeButton = document.getElementsByClassName("close")[0];

    closeButton.onclick = function() {
        modal.style.display = "none";
    };

    window.onkeydown = function(event) {
        if (event.key === "Escape") {
            modal.style.display = "none";
        }
    };

    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    };

    document.getElementById("addItemForm").addEventListener("submit", function(event) {
        event.preventDefault();
        var produto = document.getElementById("produtoInput").value;
        var codigoProduto = document.getElementById("codigoProdutoInput").value;
        var valorUnitario = document.getElementById("valorUnitario").value;
    
        if (codigoProduto && produto && valorUnitario) {
            adicionarItemTabela(codigoProduto, produto, valorUnitario);
            modal.style.display = "none";
            resetForm();
            salvarItens(); 
        } else {
            alert("Certifique-se de preencher todos os campos obrigatórios.");
        }
    });

    function salvarItens() {
        var tabelaItens = document.getElementById("tabelaFaturamento").getElementsByTagName('tbody')[0];
        var itens = [];
        for (var i = 0; i < tabelaItens.rows.length; i++) {
            var item = {
                produto: tabelaItens.rows[i].cells[1].innerHTML,
                codigoProduto: tabelaItens.rows[i].cells[0].innerHTML,
                valorUnitario: tabelaItens.rows[i].cells[2].innerHTML
            };
            itens.push(item);
        }
        localStorage.setItem('tabelaFaturamento', JSON.stringify(itens));
    }

    function carregarItens() {
        var itens = JSON.parse(localStorage.getItem('tabelaFaturamento'));
        if (itens) {
            for (var i = 0; i < itens.length; i++) {
                adicionarItemTabela(itens[i].codigoProduto, itens[i].produto, itens[i].valorUnitario);
            }
        }
    }

    carregarItens();

    function adicionarItemTabela(codigoProduto, produto, valorUnitario) {
        var tabelaItens = document.getElementById("tabelaFaturamento").getElementsByTagName('tbody')[0];
        var newRow = tabelaItens.insertRow();
        var cell1 = newRow.insertCell(0);
        var cell2 = newRow.insertCell(1);
        var cell3 = newRow.insertCell(2);
        cell1.textContent = codigoProduto;
        cell2.textContent = produto;
        cell3.textContent = valorUnitario;
        // Adicionando a checkbox na última célula (índice 3)
        var cellCheckbox = newRow.insertCell(3);
        cellCheckbox.innerHTML = '<input type="checkbox" class="custom-checkbox">';
    }
    
    function resetForm() {
        console.log("Resetting form...");
        var codigoProdutoInput = document.getElementById("codigoProdutoInput");
        var produtoInput = document.getElementById("produtoInput");
        var valorUnitarioInput = document.getElementById("valorUnitario");
        
        console.log("Codigo Produto Input:", codigoProdutoInput);
        console.log("Produto Input:", produtoInput);
        console.log("Valor Unitario Input:", valorUnitarioInput);
        
        codigoProdutoInput.value = "";
        produtoInput.value = "";
        valorUnitarioInput.value = "R$0,00";
    }
    

    var deleteButton = document.getElementById("deleteButton");

    deleteButton.addEventListener("click", function() {
        deleteSelectedRows();
    });

    function deleteSelectedRows() {
        var table = document.getElementById("tabelaFaturamento");
        var rows = table.querySelectorAll("tbody tr");

        rows.forEach(function(row) {
            var checkbox = row.querySelector('input[type="checkbox"]');
            if (checkbox.checked) {
                row.remove();
                salvarItens();
            }
        });
    }

    const btnEstoque = document.getElementById("btnEstoque");
    const btnParceiros = document.getElementById("btnParceiros");
    const tabelaItensBtn = document.getElementById("tabelaFaturamento");
    const tabelaParceiros = document.getElementById("tabelaParceiros");

    btnEstoque.addEventListener("click", function() {
        tabelaItensBtn.style.display = "table";
        tabelaParceiros.style.display = "none";
    });

    btnParceiros.addEventListener("click", function() {
        tabelaItensBtn.style.display = "none";
        tabelaParceiros.style.display = "table";
    });
});
