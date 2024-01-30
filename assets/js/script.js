let arr = []
const $ = args => {
    const element = document.querySelectorAll(args)
    return element.length > 1 ? element : element[0]
}
window.onload = () => {
    getLocal()
    cleanInput()
    if (localStorage.length > 0) {
        arr.forEach(obj => {
            createList.bind(obj)()
        })
        options.bind(document.querySelectorAll("ul"))()
    }
}
$(".close").onclick = () => $(".card").style.display = "none"

$("#military").onclick = () => {
    $(".hide").forEach(elm => {
        elm.classList.add("show")
    })
}
$("#normal").onclick = () => {
    $(".hide").forEach(elm => {
        elm.classList.remove("show")
    })
}
$(".btn-add").onclick = (event) => {
    event.preventDefault()
    if (verification.bind(getDataInputs())()) {
        createList.bind(getDataInputs())()
        setLocal.bind(getDataInputs())()
        options.bind(document.querySelectorAll("ul"))()
        cleanInput()
    } else {
        alert("Preencha todos os campos abaixo para adicionar.")
    }
}
$(".btn-clear-all").onclick = () => {
    const response = confirm("Deseja deletar todos os itens?")
    if (response) {
        localStorage.clear()
        $(".result").innerHTML = ''
    }
}
function getDataInputs() {
    const dataOfCars = {
        name: $("#name").value,
        doors: $("#doors").value,
        shield: $("#shield").value,
        ammunition: $("#ammunition").value,
        military: $("#military").checked,
        normal: $("#normal").checked,
        id: random()
    }
    if (dataOfCars.normal) {
        delete dataOfCars.ammunition
        delete dataOfCars.shield
        return dataOfCars
    }
    return dataOfCars
}
function createList() {
    if (this.normal) {
        $(".result").innerHTML += `
        <ul data-id ='${this.id}' title="clique para deletar">
            <li>Nome do Veículo:<span>${this.name}</span></li>
            <li>Quantidade de Portas:<span> ${this.doors}</span></li>
            <li>Tipo:<span>Carro Conversível</span></li>
        </ul>`
    } else {
        $(".result").innerHTML += `
        <ul data-id = ${this.id} title="clique para deletar">
            <li>Nome do Veículo:<span> ${this.name}</span></li>
            <li>Quantidade de Portas:<span>${this.doors}</span></li>
            <li>Blindagem:<span>${this.shield}%</span></li>
            <li>Quantidade de Munição:<span>${this.ammunition}</span></li>
            <li>Tipo:<span>Carro Militar</span></li>
        </ul>`
    }
}
function setLocal() {
    arr.push(this)
    localStorage.setItem("auto", JSON.stringify(arr))
}
function getLocal() {
    if (localStorage.length != 0) {
        arr = JSON.parse(localStorage.getItem("auto"))
    }
}
function options() {
    if (this !== undefined) {
        this.forEach(ul => {
            ul.onclick = function () {
                const idx = arr.findIndex(elm => elm.id == this.dataset.id)
                $(".card").style.display = "flex"
                editOrClear.bind({
                    element: this,
                    idx: idx,
                    object: arr[idx]
                })()
            }
        })
    }
}
function verification() {
    if (this.name == "" || this.doors == "") {
        return false
    } else if (this.military && this.ammunition == "" || this.shield == "") {
        return false
    }
    return true
}
function cleanInput() {
    $("#name").focus()
    const inputs = [
        "#name",
        "#doors",
        "#shield",
        "#ammunition"
    ]
    inputs.forEach(elm => {
        $(elm).value = ""
    })
}
function random() {
    let numberRandom = Math.random() * 999999
    while (arr.findIndex(data => data.id === numberRandom) !== -1) {
        numberRandom = Math.random() * 999999
    }
    return numberRandom
}
function editOrClear() {
    $(".delete").onclick = () => {
        $(".result").removeChild(this.element)
        arr.splice(this.idx, 1)
        localStorage.setItem("auto", JSON.stringify(arr))
        $(".card").style.display = "none"
    }
    $(".edit").onclick = () => {
        completeEntries.bind(this.object)()
        alterData.bind(this)()
    }
}
function completeEntries() {
    if (this.military) {
        $("#ammunition").value = this.ammunition
        $("#shield").value = this.shield
        $("#military").checked = true
        $(".hide").forEach(elm => { elm.classList.add("show") })
    } else {
        $("#normal").checked = true
        $(".hide").forEach(elm => { elm.classList.remove("show") })
    }
    $("#name").value = this.name
    $("#doors").value = this.doors
    $(".card").style.display = "none"
    $("#name").focus()
}
function alterData() {
    $(".btn-add").innerText = "Alterar"
    $(".btn-add").onclick = (event) => {
        event.preventDefault()
        arr.splice(this.idx, 1, getDataInputs())
        localStorage.setItem("auto", JSON.stringify(arr))
        location.reload()// improvisado -- continua desse ponto.
    }
}

