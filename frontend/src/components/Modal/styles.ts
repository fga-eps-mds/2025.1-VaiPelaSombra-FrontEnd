import styled from "styled-components";

export const Overlay = styled.div`
  position: fixed; 
  inset: 0;
  background: rgba(0, 0, 0, 0.4);
  z-index: 1000;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Modal = styled.div`
  background: white;
  border-radius: 16px;
  padding: 24px;
  width: 100%;
  max-width: 500px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
`;

export const Title = styled.h2`
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 4px;
`;

export const Subtitle = styled.p`
  font-size: 0.9rem;
  color: #666;
  margin-bottom: 24px;
`;

export const Label = styled.label`
  display: block;
  margin-bottom: 6px;
  font-weight: 500;
`;

export const Select = styled.select`
  width: 100%;
  padding: 10px;
  border-radius: 6px;
  border: 1px solid #ccc;
  font-size: 0.95rem;
`;

export const Field = styled.div`
  margin-bottom: 18px;
`;

export const Footer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  margin-top: 24px;
`;

export const Button = styled.button<{ variant?: "primary" | "secondary" }>`
  padding: 10px 16px;
  font-size: 0.9rem;
  border-radius: 6px;
  border: none;
  cursor: pointer;
  background: ${({ variant }) =>
    variant === "primary" ? "#1e2a78" : "white"};
  color: ${({ variant }) => (variant === "primary" ? "white" : "#333")};
  border: ${({ variant }) =>
    variant === "primary" ? "none" : "1px solid #ccc"};

  &:hover {
    opacity: 0.9;
  }
`;