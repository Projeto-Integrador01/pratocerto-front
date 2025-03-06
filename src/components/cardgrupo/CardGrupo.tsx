import { GithubLogo, LinkedinLogo } from "@phosphor-icons/react";

function CardGrupo() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      <div className="border border-gray-300 flex flex-col rounded-2xl overflow-hidden justify-between">
        <header className="py-2 px-6 bg-verde-2 text-white font-bold text-2xl">
          Integrante
        </header>
        <p className="p-8 text-3xl bg-slate-200 h-full">
          <div className="flex justify-center mb-4">
            <img
              src="/src/assets/integrantes/beatriz.jpg"
              alt="Foto do Integrante"
              className="w-32 h-32 rounded-full object-cover border-4 border-gray-300 shadow-lg"
            />
          </div>
          <p className="text-3xl font-bold text-center">Beatriz Novais</p>
          <p className="text-base text-gray-600">
            Olá me chamo Beatriz Novais 🙂 💻 Desenvolvedora Full Stack |
            Apaixonada pelo mundo de tecnologia Gosto muito de mangás e livros
            📖 e adoro jogos de console🎮
          </p>
          <br />
          <br />
          <br />
          <div className="flex space-x-50 justify-center mt-4">
            <a
              href="https://www.linkedin.com/in/beatriznovais/"
              target="_blank"
              className="hover:scale-110 hover:text-[#0077B5] transition-transform duration-300"
            >
              <LinkedinLogo size={48} weight="thin" />
            </a>
            <a
              href="https://github.com/triz14"
              target="_blank"
              className="hover:scale-110 hover:text-[#181717] transition-transform duration-300"
            >
              <GithubLogo size={48} weight="thin" />
            </a>
          </div>
        </p>
      </div>

      <div className="border border-gray-300 flex flex-col rounded-2xl overflow-hidden justify-between">
        <header className="py-2 px-6 bg-verde-2 text-white font-bold text-2xl">
          Integrante
        </header>
        <p className="p-8 text-3xl bg-slate-200 h-full">
          <div className="flex justify-center mb-4">
            <img
              src="/src/assets/integrantes/danilo.jpeg"
              alt="Foto do Integrante"
              className="w-32 h-32 rounded-full object-cover border-4 border-gray-300 shadow-lg"
            />
          </div>
          <p className="text-3xl font-bold text-center">Danilo Almeida</p>
          <p className="text-base text-gray-600">
            💻 Oiiiie, sou Danilo, Desenvolvedor Full Stack que adora jogos de
            terror 👻 e passar horas personalizando em jogos de simulação 🎮 e,
            claro, ☕ café é meu combustível. Sou apaixonado por aprender 📚 e
            explorar novas tecnologias, para entender o que há de novo no mundo
            digital.
          </p>
          <br />
          <br />
          <div className="flex space-x-50 justify-center mt-4">
            <a
              href="https://www.linkedin.com/in/danilo-ferreira-de-almeida/"
              target="_blank"
              className="hover:scale-110 hover:text-[#0077B5] transition-transform duration-300"
            >
              <LinkedinLogo size={48} weight="thin" />
            </a>
            <a
              href="https://github.com/hixdann"
              target="_blank"
              className="hover:scale-110 hover:text-[#181717] transition-transform duration-300"
            >
              <GithubLogo size={48} weight="thin" />
            </a>
          </div>
        </p>
      </div>
      <div className="border border-gray-300 flex flex-col rounded-2xl overflow-hidden justify-between">
        <header className="py-2 px-6 bg-verde-2 text-white font-bold text-2xl">
          Integrante
        </header>
        <p className="p-8 text-3xl bg-slate-200 h-full">
          <div className="flex justify-center mb-4">
            <img
              src="/src/assets/integrantes/gabriel.jpeg"
              alt="Foto do Integrante"
              className="w-32 h-32 rounded-full object-cover border-4 border-gray-300 shadow-lg"
            />
          </div>
          <p className="text-3xl font-bold text-center">Gabriel Nogueira</p>
          <p className="text-base text-gray-600">
            💻 Desenvolvedor Full Stack com foco em Backend Java. Com
            experiência no SEBRAE-SP, trago uma visão estratégica para negócios.
            Ex-pro player de e-sports 🎮, desenvolvi liderança e trabalho em
            equipe. Apaixonado por pôquer 🃏, vôlei 🏐 e cozinhar 🍕 para meus
            amigos e famíliares.
          </p>
          <div className="flex space-x-50 justify-center mt-4">
            <a
              href="https://www.linkedin.com/in/gabriel-nogueira-peixoto/"
              target="_blank"
              className="hover:scale-110 hover:text-[#0077B5] transition-transform duration-300"
            >
              <LinkedinLogo size={48} weight="thin" />
            </a>
            <a
              href="https://github.com/GNogueirovski"
              target="_blank"
              className="hover:scale-110 hover:text-[#181717] transition-transform duration-300"
            >
              <GithubLogo size={48} weight="thin" />
            </a>
          </div>
        </p>
      </div>
      <div className="border border-gray-300 flex flex-col rounded-2xl overflow-hidden justify-between">
        <header className="py-2 px-6 bg-verde-2 text-white font-bold text-2xl">
          Integrante
        </header>
        <p className="p-8 text-3xl bg-slate-200 h-full">
          <div className="flex justify-center mb-4">
            <img
              src="/src/assets/integrantes/gustavo.jpeg"
              alt="Foto do Integrante"
              className="w-32 h-32 rounded-full object-cover border-4 border-gray-300 shadow-lg"
            />
          </div>
          <p className="text-3xl font-bold text-center">Gustavo Corrêa</p>
          <p className="text-base text-gray-600">
            Olá! 👋 Me chamo Gustavo Corrêa e tenho 20 anos. 🚀 Estudante de
            programação e integrante da turma 79 do Bootcamp FullStack Java da
            Generation Brasil. 💻 Apaixonado por tecnologia e sempre em busca de
            novos aprendizados. 👨‍💻 Desenvolvedor de Software, focado em criar
            soluções inovadoras.
          </p>
          <div className="flex space-x-50 justify-center mt-4">
            <a
              href="https://www.linkedin.com/in/gustavo-correa11/"
              target="_blank"
              className="hover:scale-110 hover:text-[#0077B5] transition-transform duration-300"
            >
              <LinkedinLogo size={48} weight="thin" />
            </a>
            <a
              href="https://github.com/GustavoCorrea10"
              target="_blank"
              className="hover:scale-110 hover:text-[#181717] transition-transform duration-300"
            >
              <GithubLogo size={48} weight="thin" />
            </a>
          </div>
        </p>
      </div>

      <div className="border border-gray-300 flex flex-col rounded-2xl overflow-hidden justify-between">
        <header className="py-2 px-6 bg-verde-2 text-white font-bold text-2xl">
          Integrante
        </header>
        <p className="p-8 text-3xl bg-slate-200 h-full">
          <div className="flex justify-center mb-4">
            <img
              src="/src/assets/integrantes/rosilene.jpeg"
              alt="Foto do Integrante"
              className="w-32 h-32 rounded-full object-cover border-4 border-gray-300 shadow-lg"
            />
          </div>
          <p className="text-3xl font-bold text-center">Rosilene Farias</p>
          <p className="text-base text-gray-600">
            Oi, eu sou a Rosi! 💻 Desenvolvedora Full Stack | Explorando o Mundo
            da Tecnologia 🚀 Apaixonada por tecnologia, café e boas conversas!
            ☕ Depois de anos atuando na área administrativa, decidi me
            aventurar no universo da programação e estou adorando cada
            descoberta.
          </p>
          <div className="flex space-x-50 justify-center mt-4">
            <a
              href="https://www.linkedin.com/in/rosilene-fariasdomingues/"
              target="_blank"
              className="hover:scale-110 hover:text-[#0077B5] transition-transform duration-300"
            >
              <LinkedinLogo size={48} weight="thin" />
            </a>
            <a
              href="https://github.com/Rosifaarias"
              target="_blank"
              className="hover:scale-110 hover:text-[#181717] transition-transform duration-300"
            >
              <GithubLogo size={48} weight="thin" />
            </a>
          </div>
        </p>
      </div>
    </div>
  );
}

export default CardGrupo;