const About = () => {
  return (
    <section id="sobre" className="py-20 bg-card">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6">Sobre a Marca</h2>
          <p className="text-muted-foreground leading-relaxed mb-6">
            A Par Essencial reúne peças selecionadas com foco em estilo, autenticidade e presença.
            Nosso catálogo combina moda urbana, tendências atuais e itens versáteis para compor looks 
            que realmente representam personalidade.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            A proposta é unir estilo, praticidade, curadoria e atendimento próximo — 
            tudo em um único lugar para facilitar sua experiência de compra.
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;
