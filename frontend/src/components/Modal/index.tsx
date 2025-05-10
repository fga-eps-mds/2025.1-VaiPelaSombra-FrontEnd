import React, { useId } from "react";
import { Button, Field, Footer, Label, Modal, Overlay, Select, Subtitle, Title } from "./styles";


type Props = {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: any) => void;
};

export default function ModalProfile({ isOpen, onClose, onSave }: Props) {
  const idPrefix = useId();

  const [form, setForm] = React.useState({
    travelType: "",
    frequency: "",
    interests: "",
    budget: "",
  });

  const handleChange = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  if (!isOpen) return null;

  return (
    <Overlay>
      <Modal>
        <Title>Vamos montar o seu perfil 🧑‍💼</Title>
        <Subtitle>
          Não se preocupe, você pode mudar suas informações quando quiser!
        </Subtitle>

        <Field>
          <Label htmlFor={`${idPrefix}-travelType`}>
            Como você costuma viajar? 🧳
          </Label>
          <Select
            id={`${idPrefix}-travelType`}
            value={form.travelType}
            onChange={(e) => handleChange("travelType", e.target.value)}
          >
            <option value="">Escolha o seu tipo de viajante</option>
            <option value="sozinho">Sozinho</option>
            <option value="familia">Com família</option>
            <option value="casal">Casal</option>
          </Select>
        </Field>

        <Field>
          <Label htmlFor={`${idPrefix}-frequency`}>
            Qual a sua frequência de viagens? 🧳
          </Label>
          <Select
            id={`${idPrefix}-frequency`}
            value={form.frequency}
            onChange={(e) => handleChange("frequency", e.target.value)}
          >
            <option value="">Escolha a sua frequência de viagens</option>
            <option value="anual">1x ao ano</option>
            <option value="semestral">2x ao ano</option>
            <option value="mensal">Mensalmente</option>
          </Select>
        </Field>

        <Field>
          <Label htmlFor={`${idPrefix}-interests`}>
            Quais são os seus interesses de viagem? 🏞️
          </Label>
          <Select
            id={`${idPrefix}-interests`}
            value={form.interests}
            onChange={(e) => handleChange("interests", e.target.value)}
          >
            <option value="">Escolha seus interesses</option>
            <option value="aventura">Aventura</option>
            <option value="cultural">Cultural</option>
            <option value="praia">Praia</option>
          </Select>
        </Field>

        <Field>
          <Label htmlFor={`${idPrefix}-budget`}>
            Qual é o seu orçamento médio por viagem? 💸
          </Label>
          <Select
            id={`${idPrefix}-budget`}
            value={form.budget}
            onChange={(e) => handleChange("budget", e.target.value)}
          >
            <option value="">Escolha uma faixa de preço</option>
            <option value="baixo">Até R$1000</option>
            <option value="medio">R$1000 - R$3000</option>
            <option value="alto">Acima de R$3000</option>
          </Select>
        </Field>

        <Footer>
          <Button onClick={onClose}>Pular</Button>
          <Button variant="primary" onClick={() => onSave(form)}>
            Salvar preferências
          </Button>
        </Footer>
      </Modal>
    </Overlay>
  );
}
