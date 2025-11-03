// HTML要素を取得
const startBtn = document.getElementById("start-btn");
const checkBtn = document.getElementById("check-btn");
const currentName = document.getElementById("current");
const pokeImg = document.getElementById("poke-img");
const hint = document.getElementById("hint");
const message = document.getElementById("message");
const answerInput = document.getElementById("answer");

let currentLastChar = "";

// ランダムなポケモンを取得して表示
async function getPokemon() {
  try {
    const randomId = Math.floor(Math.random() * 1025) + 1;
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${randomId}`);
    if (!res.ok) throw new Error(`エラー: ${res.status}`);

    const data = await res.json();

    // 名前と画像を表示
    currentName.textContent = data.name;
    pokeImg.src = data.sprites.front_default;
    pokeImg.alt = data.name;

    // 末尾文字を保存・表示
    currentLastChar = data.name.slice(-1);
    hint.textContent = `末尾の文字：${currentLastChar}`;

    // 入力欄とメッセージをリセット
    answerInput.value = "";
    message.textContent = "";

  } catch (error) {
    console.error("通信エラー:", error);
    currentName.textContent = "ポケモンを取得できませんでした";
    pokeImg.src = "";
    hint.textContent = "";
  }
}

// ユーザー入力を判定（存在チェック付き）
async function checkAnswer() {
  const userInput = answerInput.value.trim().toLowerCase();
  if (!userInput) return;

  try {
    // 入力ポケモンが存在するか確認
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${userInput}`);
    if (!res.ok) throw new Error("存在しないポケモン");

    const firstChar = userInput.charAt(0);

    if (firstChar === currentLastChar) {
      message.textContent = "正解！次のポケモンが出ます";
      await getPokemon(); // 正解なら次のポケモンを表示
    } else {
      message.textContent = "残念！文字がつながっていません";
    }

  } catch {
    message.textContent = "そのポケモンは存在しません";
  }
}

// ボタンにイベントを設定
startBtn.addEventListener("click", getPokemon);
checkBtn.addEventListener("click", checkAnswer);
