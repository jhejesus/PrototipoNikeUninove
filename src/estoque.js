document.addEventListener("DOMContentLoaded", function() {
    var addButton = document.getElementById("addButton");
    var modal = document.getElementById("modal");
    var tabelaItens = document.getElementById("tabelaItens");
    var checkBoxAdded = false;

    addButton.addEventListener("click", function() {
        modal.style.display = "block";
        resetForm();
        document.getElementById("tipo").focus();
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
        var codigoProduto = document.getElementById("codigoProdutoInput").value;
        var tipo = document.getElementById("tipo").value;
        var modelo = document.getElementById("modelo").value;
        var cor = document.getElementById("cor").value;
        var tamanho = document.getElementById("tamanho").value;
        var quantidade = document.getElementById("quantidade").value;
        var valorUnitario = document.getElementById("valorUnitario").value;

        if (tipo && modelo && cor && tamanho && quantidade && valorUnitario) {
            adicionarItemTabela(codigoProduto, tipo, modelo, cor, tamanho, quantidade, valorUnitario);
            modal.style.display = "none";
            resetForm();
            salvarItens(); 
        } else {
            alert("Certifique-se de preencher todos os campos obrigatórios.");
        }
    });

    function salvarItens() {
        var tabelaItens = document.getElementById("tabelaItens").getElementsByTagName('tbody')[0];
        var itens = [];
        for (var i = 0; i < tabelaItens.rows.length; i++) {
            var item = {
                codigoProduto: tabelaItens.rows[i].cells[0].innerHTML,
                tipo: tabelaItens.rows[i].cells[1].innerHTML,
                modelo: tabelaItens.rows[i].cells[2].innerHTML,
                cor: tabelaItens.rows[i].cells[3].innerHTML,
                tamanho: tabelaItens.rows[i].cells[4].innerHTML,
                quantidade: tabelaItens.rows[i].cells[5].innerHTML,
                valorUnitario: tabelaItens.rows[i].cells[6].innerHTML
            };
            itens.push(item);
        }
        localStorage.setItem('itensTabela', JSON.stringify(itens));
    }

    function carregarItens() {
        var itens = JSON.parse(localStorage.getItem('itensTabela'));
        if (itens) {
            for (var i = 0; i < itens.length; i++) {
                adicionarItemTabela(itens[i].codigoProduto, itens[i].tipo, itens[i].modelo, itens[i].cor, itens[i].tamanho, itens[i].quantidade, itens[i].valorUnitario);
            }
        }
    }

    carregarItens();

    function adicionarItemTabela(codigoProduto, tipo, modelo, cor, tamanho, quantidade, valorUnitario) {
        var tabelaItens = document.getElementById("tabelaItens").getElementsByTagName('tbody')[0];
        var newRow = tabelaItens.insertRow();
        var cell1 = newRow.insertCell(0);
        var cell2 = newRow.insertCell(1);
        var cell3 = newRow.insertCell(2);
        var cell4 = newRow.insertCell(3);
        var cell5 = newRow.insertCell(4);
        var cell6 = newRow.insertCell(5);
        var cell7 = newRow.insertCell(6);
        var cellCheckbox = newRow.insertCell(7); // Célula para checkbox
        cell1.innerHTML = codigoProduto;
        cell2.innerHTML = tipo;
        cell3.innerHTML = modelo;
        cell4.innerHTML = cor;
        cell5.innerHTML = tamanho;
        cell6.innerHTML = quantidade;
        cell7.innerHTML = valorUnitario;
        cellCheckbox.innerHTML = '<input type="checkbox" class="custom-checkbox">'; // Inserir checkbox com classe de estilo
    }

    function resetForm() {
        document.getElementById("codigoProdutoInput").value = "";
        document.getElementById("tipo").value = "";
        document.getElementById("modelo").value = "";
        document.getElementById("cor").value = "";
        document.getElementById("tamanho").value = "";
        document.getElementById("quantidade").value = "";
        document.getElementById("valorUnitario").value = "R$0,00"; 
    }

    var deleteButton = document.getElementById("deleteButton");

    deleteButton.addEventListener("click", function() {
        deleteSelectedRows();
    });

    function deleteSelectedRows() {
        var table = document.getElementById("tabelaItens");
        var rows = table.querySelectorAll("tbody tr");

        rows.forEach(function(row) {
            var checkbox = row.querySelector('input[type="checkbox"]');
            if (checkbox.checked) {
                row.remove();
                salvarItens();
            }
        });
    }


    document.addEventListener("DOMContentLoaded", function() {
        const btnEstoque = document.getElementById("btnEstoque");
        const btnParceiros = document.getElementById("btnParceiros");
        const tabelaItens = document.getElementById("tabelaItens");
        const tabelaParceiros = document.getElementById("tabelaParceiros");

        btnEstoque.addEventListener("click", function() {
            tabelaItens.style.display = "table";
            tabelaParceiros.style.display = "none";
        });

        btnParceiros.addEventListener("click", function() {
            tabelaItens.style.display = "none";
            tabelaParceiros.style.display = "table";
        });
    });


    

});
