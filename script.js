function animarContagem(elemento) {
      const valorFinal = Number(elemento.getAttribute("data-target"));
      if (isNaN(valorFinal)) return;

      let valorAtual = 0;
      const duracao = 1500; // duração total da animação em ms
      const intervalo = 20; // intervalo entre atualizações em ms
      const totalEtapas = Math.ceil(duracao / intervalo);
      const incremento = valorFinal / totalEtapas;

      const contador = setInterval(() => {
        valorAtual += incremento;
        if (valorAtual >= valorFinal) {
          elemento.innerText = valorFinal.toLocaleString("pt-BR"); // formata com separador
          clearInterval(contador);
        } else {
          elemento.innerText = Math.floor(valorAtual).toLocaleString("pt-BR");
        }
      }, intervalo);
    }

    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const numeros = document.querySelectorAll(".numero-contagem");
          numeros.forEach((numero) => animarContagem(numero));
          obs.disconnect();
        }
      });
    });

    const secaoContagem = document.querySelector("#contagem");
    if (secaoContagem) {
      observer.observe(secaoContagem);
    }

    document.querySelectorAll("nav li[data-target]").forEach((item) => {
      item.addEventListener("click", () => {
        const targetId = item.getAttribute("data-target");
        const targetSection = document.getElementById(targetId);
        if (targetSection) {
          targetSection.scrollIntoView({
            behavior: "smooth", // <-- ESSA LINHA é o segredo
          });
        }
      });
    });