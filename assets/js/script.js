// HTML要素を取得
const serachInput = document.getElementById("serach");
const btn = document.getElementById("btn");
const pokeName = document.getElementById("name");
const pokeImg = document.getElementById("poke-img");
const type = document.getElementById("type");
const height = document.getElementById("height");
const weight = document.getElementById("weight");

// let currentLastChar = "";

// ランダムなポケモンを取得して表示
async function getPokemon() {
  try {
    const currentName = serachInput.value.toLowerCase().trim() ;
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${currentName}`);
    if (!res.ok) throw new Error(`エラー: ${res.status}`);

    const data = await res.json();

    // 入力されたポケモンのを表示
    pokeName.textContent = data.name;
    pokeImg.src = data.sprites.front_default;
    pokeImg.alt = data.name;
    type.textContent = data.types.map(t => t.type.name).join(", ");
    height.textContent = data.height;
    weight.textContent = data.weight;

    

  } catch (error) {
    console.error("通信エラー:", error);
    pokeName.textContent = "ポケモンを取得できませんでした";
    pokeImg.src = "";
  }
}


// ボタンにイベントを設定
btn.addEventListener("click", getPokemon);

