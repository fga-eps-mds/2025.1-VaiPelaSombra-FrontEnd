import React, { useState } from "react";
import Navbar from "../components/NavBar";
import "./ResumoViagem.css";

const checklist = [
  { categoria: "Documentos", itens: ["Passaporte", "Identidade", "Carteira com cartão", "Reserva do hotel"] },
  { categoria: "Higiene pessoal", itens: ["Pasta de dente", "Escova", "Sabonete", "Shampoo"] },
  { categoria: "Roupas", itens: ["Roupas íntimas", "Camiseta", "Short", "Meia"] },
];

const etapas = [
  {
    etapa: "Brasília → Paris",
    meio: "Avião",
    saida: "2025-07-10T16:00:00-03:00", // Horário local de Brasília
    chegada: "2025-07-11T07:00:00+02:00", // Horário local de Paris
  },
  {
    etapa: "Paris → Amsterdam",
    meio: "Trem",
    saida: "2025-07-12T09:00:00+02:00",
    chegada: "2025-07-12T12:00:00+02:00",
  },
];

const resumo = [
  "Viagem internacional para turismo.",
  "Participação em eventos culturais.",
  "Visita a pontos turísticos famosos.",
];

const cronograma = [
  { dia: "10/07/2025", atividade: "Chegada em Paris, check-in no hotel" },
  { dia: "11/07/2025", atividade: "Tour: Torre Eiffel e Museu do Louvre" },
  { dia: "12/07/2025", atividade: "Viagem para Amsterdam" },
];

const UTC_TITLE = "UTC: Tempo Universal Coordenado, o horário de referência mundial, baseado no horário no meridiano de Greenwich (GMT).";

function ResumoViagem() {
  const [aba, setAba] = useState("checklist");
  const [transportes, setTransportes] = useState([
    { tipo: "Avião", companhia: "Latam", numero: "LA1234", data: "2025-07-10" },
  ]);
  const [novoTransporte, setNovoTransporte] = useState({ tipo: "", companhia: "", numero: "", data: "" });

  function handleAddTransporte(e: React.FormEvent) {
    e.preventDefault();
    setTransportes([...transportes, novoTransporte]);
    setNovoTransporte({ tipo: "", companhia: "", numero: "", data: "" });
  }

  // Função utilitária para formatar datas
  function formatarDataHora(dt: string) {
    const data = new Date(dt);
    // Horário local
    const local = data.toLocaleString("pt-BR", {
      dateStyle: "short",
      timeStyle: "short",
    });
    // Horário UTC
    const utc = data.toLocaleString("pt-BR", {
      dateStyle: "short",
      timeStyle: "short",
      timeZone: "UTC",
    });
    return { local, utc, data };
  }

  /*
	// Função para calcular diferença de dias
  function diferencaDias(dataSaida: Date, dataChegada: Date) {
    const diff = Math.floor(
      (dataChegada.getTime() - dataSaida.getTime()) / (1000 * 60 * 60 * 24)
    );
    return diff;
  }
		*/
	// Função para diferença de dias do calendário local
	function diferencaDiasCalendario(dataSaida: Date, dataChegada: Date) {
		// Zera horas para comparar só o dia
		const saida = new Date(dataSaida.getFullYear(), dataSaida.getMonth(), dataSaida.getDate());
		const chegada = new Date(dataChegada.getFullYear(), dataChegada.getMonth(), dataChegada.getDate());
		const diff = Math.round((chegada.getTime() - saida.getTime()) / (1000 * 60 * 60 * 24));
		return diff;
	}

	// Função para diferença de dias do calendário UTC
	function diferencaDiasCalendarioUTC(dataSaida: Date, dataChegada: Date) {
		const saidaUTC = new Date(Date.UTC(dataSaida.getUTCFullYear(), dataSaida.getUTCMonth(), dataSaida.getUTCDate()));
		const chegadaUTC = new Date(Date.UTC(dataChegada.getUTCFullYear(), dataChegada.getUTCMonth(), dataChegada.getUTCDate()));
		const diff = Math.round((chegadaUTC.getTime() - saidaUTC.getTime()) / (1000 * 60 * 60 * 24));
		return diff;
	}

  // Função para calcular duração total
  function duracaoViagem(dataSaida: Date, dataChegada: Date) {
    const diffMs = dataChegada.getTime() - dataSaida.getTime();
    const totalMin = Math.floor(diffMs / (1000 * 60));
    const dias = Math.floor(totalMin / (60 * 24));
    const horas = Math.floor((totalMin % (60 * 24)) / 60);
    const minutos = totalMin % 60;

    let resultado = "";
    if (dias > 0) resultado += `${dias}d `;
    if (horas > 0 || dias > 0) resultado += `${horas}h `;
    resultado += `${minutos}min`;

    return resultado.trim();
  }

  return (
    <div className="resumo-bg">
      <Navbar />
      <div className="resumo-container">
        <h1 className="resumo-titulo">Resumo da Viagem</h1>
        <div className="resumo-abas">
          <button className={aba === "checklist" ? "ativa" : ""} onClick={() => setAba("checklist")}>Checklist</button>
          <button className={aba === "tempo" ? "ativa" : ""} onClick={() => setAba("tempo")}>Tempo estimado de cada etapa</button>
          <button className={aba === "resumo" ? "ativa" : ""} onClick={() => setAba("resumo")}>Resumo da Viagem</button>
          <button className={aba === "cronograma" ? "ativa" : ""} onClick={() => setAba("cronograma")}>Cronograma</button>
          <button className={aba === "transportes" ? "ativa" : ""} onClick={() => setAba("transportes")}>Transportes</button>
        </div>

        {aba === "checklist" && (
          <div className="resumo-tabela-wrapper">
            <table className="resumo-tabela">
              <thead>
                <tr>
                  <th>Categoria</th>
                  <th>Item</th>
                  <th>Feito</th>
                </tr>
              </thead>
              <tbody>
                {checklist.map((cat) =>
                  cat.itens.map((item, idx) => (
                    <tr key={item}>
                      {idx === 0 && (
                        <td rowSpan={cat.itens.length} className="categoria">{cat.categoria}</td>
                      )}
                      <td>{item}</td>
                      <td>
                        <input
                          name="checklist-item"
                          type="checkbox"
                          placeholder="Marcar como feito"
                        />
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}

        {aba === "tempo" && (
          <div className="resumo-tabela-wrapper">
            <table className="resumo-tabela">
              <thead>
                <tr>
                  <th>Etapa</th>
                  <th title={UTC_TITLE}>
                    Saída<br />(local / UTC)
                  </th>
                  <th title={UTC_TITLE}>
                    Chegada<br />(local / UTC)
                  </th>
                  <th>Duração</th>
                  <th>Meio de transporte</th>
                </tr>
              </thead>
              <tbody>
                {etapas.map((e, idx) => {
									const { local: saidaLocal, utc: saidaUTC, data: dataSaida } = formatarDataHora(e.saida);
									const { local: chegadaLocal, utc: chegadaUTC, data: dataChegada } = formatarDataHora(e.chegada);

									// Diferença de dias do calendário local e UTC
									const diasLocal = diferencaDiasCalendario(dataSaida, dataChegada);
									const diasUTC = diferencaDiasCalendarioUTC(dataSaida, dataChegada);

									const duracao = duracaoViagem(dataSaida, dataChegada);

									return (
										<tr key={idx}>
											<td>{e.etapa}</td>
											<td>
												{saidaLocal}
												<br />
												<span className="resumo-hora-utc" title={UTC_TITLE}>
													{saidaUTC} UTC
												</span>
											</td>
											<td>
												{chegadaLocal}
												{diasLocal > 0 && (
													<span className="resumo-dia-extra">
														{" "} (+{diasLocal} dia{diasLocal > 1 ? "s" : ""})
													</span>
												)}
												<br />
												<span className="resumo-hora-utc" title={UTC_TITLE}>
													{chegadaUTC} UTC
													{diasUTC > 0 && (
														<span className="resumo-dia-extra">
															{" "} (+{diasUTC} dia{diasUTC > 1 ? "s" : ""})
														</span>
													)}
												</span>
											</td>
											<td>{duracao}</td>
											<td>{e.meio}</td>
										</tr>
									);
								})}
              </tbody>
            </table>
          </div>
        )}

        {aba === "resumo" && (
					<div className="resumo-lista">
						{resumo.map((linha, idx) => (
							<p key={idx} className="resumo-paragrafo">{linha}</p>
						))}
					</div>
				)}

        {aba === "cronograma" && (
          <div className="resumo-tabela-wrapper">
            <table className="resumo-tabela">
              <thead>
                <tr>
                  <th>Dia</th>
                  <th>Atividade</th>
                </tr>
              </thead>
              <tbody>
                {cronograma.map((c, idx) => (
                  <tr key={idx}>
                    <td>{c.dia}</td>
                    <td>{c.atividade}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {aba === "transportes" && (
          <div className="resumo-transportes">
            <h2>Transportes</h2>
            <form className="transporte-form" onSubmit={handleAddTransporte}>
              <input
                placeholder="Tipo (ex: Avião, Ônibus)"
                value={novoTransporte.tipo}
                onChange={e => setNovoTransporte({ ...novoTransporte, tipo: e.target.value })}
                required
              />
              <input
                placeholder="Companhia"
                value={novoTransporte.companhia}
                onChange={e => setNovoTransporte({ ...novoTransporte, companhia: e.target.value })}
              />
              <input
                placeholder="Número"
                value={novoTransporte.numero}
                onChange={e => setNovoTransporte({ ...novoTransporte, numero: e.target.value })}
              />
              <input
                id="dataViagem"
                type="date"
                value={novoTransporte.data}
                onChange={e => setNovoTransporte({ ...novoTransporte, data: e.target.value })}
                required
                title="Selecione a data da viagem"
              />
              <button type="submit">Adicionar</button>
            </form>
            <table className="resumo-tabela">
              <thead>
                <tr>
                  <th>Tipo</th>
                  <th>Companhia</th>
                  <th>Número</th>
                  <th>Data</th>
                </tr>
              </thead>
              <tbody>
                {transportes.map((t, idx) => (
                  <tr key={idx}>
                    <td>{t.tipo}</td>
                    <td>{t.companhia}</td>
                    <td>{t.numero}</td>
                    <td>{t.data}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default ResumoViagem;