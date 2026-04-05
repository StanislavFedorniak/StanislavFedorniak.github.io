function Missions() {
  return (
    <section className="missions" aria-labelledby="missions-heading">
      <h2 id="missions-heading">Доступні експедиції</h2>

      <article className="mission">
        <h3>Марс — зразки ґрунту</h3>
        <p>
          <strong>Маршрут:</strong> орбіта Землі → Марс
        </p>
        <p>
          <strong>Тривалість:</strong> ~210 днів
        </p>
        <p>
          <strong>Статус:</strong> набір екіпажу
        </p>
      </article>

      <article className="mission">
        <h3>Європа — підлідна розвідка</h3>
        <p>
          <strong>Маршрут:</strong> Юпітер, супутник Європа
        </p>
        <p>
          <strong>Тривалість:</strong> ~4 роки
        </p>
        <p>
          <strong>Статус:</strong> планування
        </p>
      </article>

      <article className="mission">
        <h3>Пояс астероїдів — добича ресурсів</h3>
        <p>
          <strong>Маршрут:</strong> Церера — Веста
        </p>
        <p>
          <strong>Тривалість:</strong> ~180 днів
        </p>
        <p>
          <strong>Статус:</strong> доступна
        </p>
      </article>
    </section>
  );
}

export default Missions;
