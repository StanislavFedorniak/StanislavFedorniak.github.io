function Ship() {
  return (
    <section className="ship" aria-labelledby="ship-heading">
      <h2 id="ship-heading">Стан космічного корабля</h2>
      <div className="ship-stats-container">
        <div className="stat-item">
          <p>Корпус</p>
          <strong>98%</strong>
        </div>
        <div className="stat-item">
          <p>Щити</p>
          <strong>100%</strong>
        </div>
        <div className="stat-item">
          <p>Паливо</p>
          <strong>76%</strong>
        </div>
        <div className="stat-item">
          <p>Екіпаж</p>
          <strong>Готовий</strong>
        </div>
      </div>
    </section>
  );
}

export default Ship;
