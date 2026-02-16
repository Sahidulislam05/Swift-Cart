# 📚 JavaScript Important Concepts

## Question 1: `null` এবং `undefined` এর মধ্যে পার্থক্য কি?

### 📖 ব্যাখ্যা:

**`undefined`** মানে হলো - জিনিসটা declare করা হয়েছে কিন্তু কোনো value দেওয়া হয়নি। JavaScript নিজে থেকেই এটা set করে দেয়।

**`null`** মানে হলো - আমরা নিজেরা ইচ্ছা করে বলে দিয়েছি যে এখানে কিছু নেই। এটা programmer ইচ্ছা করে set করে।

### 💡 উদাহরণ:

```javascript
undefined এর উদাহরণ

let name;
console.log(name); // Output: undefined

function greet(name) {
  console.log(name);
}
greet(); // Output: undefined

null এর উদাহরণ

let user = null;
console.log(user); // Output: null

let data = { name: "Rahim" };
data = null;
```

### 🔑 মূল পার্থক্য:

| বিষয়       | `undefined`             | `null`                          |
| ----------- | ----------------------- | ------------------------------- |
| কে set করে? | JavaScript নিজে থেকে    | আমরা নিজেরা                     |
| মানে কি?    | value এখনো দেওয়া হয়নি | value নেই বলে বলে দেওয়া হয়েছে |
| Type        | `undefined`             | `object`                        |

---

## Question 2: JavaScript এ `map()` function এর কাজ কি? এটা `forEach()` থেকে কিভাবে আলাদা?

### 📖 ব্যাখ্যা:

**`map()`** হলো একটা array method যেটা প্রতিটা element এর উপর কাজ করে এবং **নতুন একটা array return করে**। Original array টা change হয় না।

**`forEach()`** ও প্রতিটা element এর উপর কাজ করে কিন্তু **কিছু return করে না**। শুধু loop চালায়।

### 💡 উদাহরণ:

```javascript
const numbers = [1, 2, 3, 4, 5];

map() এর উদাহরণ - নতুন array return করে

const doubled = numbers.map(function(num) {
  return num * 2;
});

console.log(doubled); // Output: [2, 4, 6, 8, 10]
console.log(numbers); // Output: [1, 2, 3, 4, 5] (original array same থাকে)

forEach() এর উদাহরণ - কিছু return করে না

const result = numbers.forEach(function(num) {
  console.log(num * 2);
});

console.log(result); // Output: undefined (কিছু return করে না)
```

### 🔄 Arrow Function দিয়ে আরো সহজ করে:

```javascript
const numbers = [10, 20, 30];

map() দিয়ে নতুন array বানানো

const tripled = numbers.map(num => num * 3);
console.log(tripled); // [30, 60, 90]

forEach() দিয়ে শুধু কাজ করা

numbers.forEach(num => {
  console.log(num + 5);
});

// Output: 15, 25, 35 (কিন্তু কোনো array return হবে না)
```

### 🔑 মূল পার্থক্য:

| বিষয়             | `map()`              | `forEach()`              |
| ----------------- | -------------------- | ------------------------ |
| Return করে?       | হ্যাঁ, নতুন array    | না, undefined            |
| কখন ব্যবহার করবো? | যখন নতুন array লাগবে | যখন শুধু loop চালাতে হবে |
| Chain করা যায়?   | হ্যাঁ                | না                       |

### 🎯 কখন কোনটা ব্যবহার করবো?

- **`map()` ব্যবহার করবো** যখন প্রতিটা element কে transform করে নতুন array বানাতে হবে
- **`forEach()` ব্যবহার করবো** যখন শুধু console.log বা অন্য কোনো side effect চালাতে হবে

---

## Question 3: `==` এবং `===` এর মধ্যে পার্থক্য কি?

### 📖 ব্যাখ্যা:

**`==`** কে বলা হয় **Loose Equality** বা **Abstract Equality**। এটা শুধু value check করে, type check করে না। প্রয়োজনে type convert করে নেয়।

**`===`** কে বলা হয় **Strict Equality**। এটা value এবং type দুইটাই check করে। Type convert করে না।

### 💡 উদাহরণ:

```javascript
 == (Loose Equality) এর উদাহরণ

console.log(5 == "5");     // true (string কে number এ convert করে তুলনা করে)
console.log(0 == false);   // true (false কে 0 তে convert করে)
console.log(null == undefined); // true (special case)

 === (Strict Equality) এর উদাহরণ

console.log(5 === "5");    // false (type আলাদা - number vs string)
console.log(0 === false);  // false (type আলাদা - number vs boolean)
console.log(null === undefined); // false (type আলাদা)

```

### 🔑 মূল পার্থক্য:

| Operator | Type Check করে? | Type Convert করে? | সুপারিশ                 |
| -------- | --------------- | ----------------- | ----------------------- |
| `==`     | না              | হ্যাঁ             | ব্যবহার না করাই ভালো    |
| `===`    | হ্যাঁ           | না                | সবসময় এটা ব্যবহার করবো |

### ⚠️ সতর্কতা:

সবসময় `===` ব্যবহার করা best practice। `==` ব্যবহার করলে অনেক সময় unexpected result আসতে পারে।

---

## Question 4: API data fetch করার সময় `async`/`await` এর গুরুত্ব কি?

### 📖 ব্যাখ্যা:

**`async`/`await`** হলো JavaScript এ asynchronous কাজ সহজে করার একটা উপায়। API থেকে data নিয়ে আসতে সময় লাগে। এই সময়ে JavaScript অপেক্ষা না করে পরের কাজ করতে থাকে। `async`/`await` দিয়ে আমরা JavaScript কে বলে দিতে পারি যে এখানে অপেক্ষা করতে হবে।

### 💡Promise চেইন

```javascript
Promise ব্যবহার করে API call

function getProducts() {
  fetch('https://fakestoreapi.com/products')
    .then(response => response.json())
    .then(data => {
      console.log(data);
    })
    .catch(error => {
      console.log('Error:', error);
    });
}
```

### 🚀 async/await

```javascript
async/await ব্যবহার করে API call

async function getProducts() {
  try {
    const response = await fetch('https://fakestoreapi.com/products');
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.log('Error:', error);
  }
}

getProducts();
```

### 🔑 `async`/`await` এর গুরুত্ব:

1. **সহজ পড়তে**: Code দেখতে synchronous মনে হয়, বুঝতে সহজ
2. **Error Handling সহজ**: try-catch দিয়ে সহজে error handle করা যায়
3. **Multiple API Call সহজ**: একের পর এক API call করা সহজ

### ⚠️ মনে রাখতে হবে:

- `await` শুধু `async` function এর ভিতরেই ব্যবহার করতে হয়
- `async` function সবসময় Promise return করে
- Error handling এর জন্য try-catch ব্যবহার করতে হবে

---

## Question 5: JavaScript এ Scope এর concept ব্যাখ্যা করুন (Global, Function, Block)

### 📖 ব্যাখ্যা:

**Scope** মানে হলো variable টা কোথায় কোথায় access করা যাবে, কোথায় করা যাবে না। JavaScript এ ৩ ধরনের scope আছে:

1. **Global Scope** - সব জায়গায় access করা যায়
2. **Function Scope** - শুধু function এর ভিতরে access করা যায়
3. **Block Scope** - শুধু `{}` এর ভিতরে access করা যায় (let, const এর জন্য)

### 💡 1. Global Scope:

```javascript
Global scope এ declare করা variable

let websiteName = "SwiftCart";
var totalProducts = 100;

function showInfo() {
  console.log(websiteName);   // Access করা যাবে
  console.log(totalProducts); // Access করা যাবে
}

showInfo();
console.log(websiteName); // এখানেও access করা যাবে
```

### 💡 2. Function Scope:

```javascript
function calculateTotal() {
  // Function scope এ declare করা variable

  let price = 100;
  var quantity = 5;

  let total = price * quantity;
  console.log(total); // 500 - কাজ করবে
}

calculateTotal();

console.log(price); // Error - price is not defined
console.log(total); // Error - total is not defined

 কারণ: এগুলো function এর বাইরে থেকে access করা যায় না
```

### 💡 3. Block Scope:

```javascript
if block এর উদাহরণ

if (true) {
  let blockVariable = "I am in block";
  const anotherBlockVar = "Me too";
  var notBlockScoped = "I am different";

  console.log(blockVariable); // কাজ করবে
}

console.log(blockVariable);   // Error - not defined
console.log(anotherBlockVar); // Error - not defined
console.log(notBlockScoped);  // কাজ করবে (var block scope মানে না)

for loop এর উদাহরণ

for (let i = 0; i < 3; i++) {
  console.log(i); // 0, 1, 2
}

console.log(i); // Error - i is not defined

কারণ: let দিয়ে declare করা variable block এর বাইরে access করা যায় না
```

### 🔑 var, let, const এর scope:

```javascript
var - Function Scoped

function testVar() {
  if (true) {
    var x = 10;
  }
  console.log(x); // 10 - কাজ করবে (var block scope মানে না)
}

let - Block Scoped

function testLet() {
  if (true) {
    let y = 20;
  }
  console.log(y); // Error - y is not defined
}

const - Block Scoped

function testConst() {
  if (true) {
    const z = 30;
  }
  console.log(z); // Error - z is not defined
}
```

### 📊 Scope Summary Table:

| Variable Type | Global Scope | Function Scope | Block Scope |
| ------------- | ------------ | -------------- | ----------- |
| `var`         | ✅           | ✅             | ❌          |
| `let`         | ✅           | ✅             | ✅          |
| `const`       | ✅           | ✅             | ✅          |

### 💡 Best Practice:

1. সবসময় `let` বা `const` ব্যবহার করবো, `var` এড়িয়ে চলবো
2. যতটা সম্ভব Global scope এ variable declare করা এড়িয়ে চলবো
3. যেখানে value change হবে না সেখানে `const` ব্যবহার করবো
4. যেখানে value change হবে সেখানে `let` ব্যবহার করবো

---

## 🎓 শেষ কথা

এই ৫টা concept JavaScript এ খুবই গুরুত্বপূর্ণ। ভালো করে বুঝে practice করলে আপনার JavaScript এর foundation অনেক strong হবে।

**Happy Coding! 🚀**
