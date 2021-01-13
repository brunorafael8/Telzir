import React, { useState, useRef } from 'react';
import { useLazyLoadQuery } from 'react-relay/hooks';
import { graphql } from 'react-relay';
import styled from 'styled-components';
import Input from './components/Input';
import Select from './components/Select';
import Button from './components/Button';
import { AppQuery } from './__generated__/AppQuery.graphql';
import { formatPlans } from './helpers/formatPlans';

const Container = styled.div`
  height: 100vh;
  width: 100%;
  background-color: #1f192a;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`;

const Logo = styled.h1`
  font-family: Lato;
  font-weight: 900;
  font-size: 70px;
  color: #ffffff;
  margin-bottom: 20px;
  text-transform: uppercase;
  letter-spacing: -3px;
`;

const Content = styled.main`
  width: 437px;
  height: 70%;
  background: #e92036;
  border-radius: 15px;
  display: flex;
  align-items: center;
  flex-direction: column;
  overflow: auto;
  padding: 0 20px;
  @media (max-width: 800px) {
    width: 80%;
  }
`;

const Title = styled.h2`
  font-family: Roboto;
  font-weight: 900;
  font-size: 28px;
  color: #ffffff;
  text-transform: uppercase;
  margin-top: 40px;
`;

const Description = styled.p`
  font-family: Roboto;
  font-weight: light;
  font-size: 16px;
  text-align: center;
  color: #ffffff;
  margin-bottom: 20px;
  margin-top: 10px;
`;

const DescriptionForm = styled.p`
  font-family: Roboto;
  font-weight: light;
  font-size: 16px;
  text-align: left;
  color: #ffffff;
  margin-bottom: 10px;
  margin-top: 10px;
`;

const Form = styled.form`
  width: 80%;
`;

const SubmitButton = styled(Button)`
  width: 100%;
  margin-top: 60px;
  height: 48px;
`;

const Infos = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin: 40px 0;
  flex-direction: column;
`;

const Info = styled.div`
  display: flex;
  border-radius: 10px;
  width: 80%;
  height: 90px;
  flex-direction: column;
  padding: 10px 20px;
  background-color: #000b3c;
  margin-bottom: 5px;
  box-sizing: border-box;
`;

const InfoTitle = styled.span`
  font-family: 'Roboto';
  font-size: 18px;
  letter-spacing: 0;
  line-height: 24px;
  font-weight: bold;
  color: #de0c4b;
  align-self: flex-start;
  height: 50px;
`;

const InfoValue = styled.span`
  font-family: 'Lato';
  font-size: 16px;
  letter-spacing: 0;
  line-height: 24px;
  font-weight: normal;
  align-self: flex-end;
  color: #fff;
  margin-top: 5px;
`;

function App() {
  const formRef = useRef(null);
  const priceRef = useRef(null);
  const { plans, price } = useLazyLoadQuery<AppQuery>(query, {});
  const [plan, setPlan] = useState('');
  const [origin, setOrigin] = useState('');
  const [destiny, setDestiny] = useState('');
  const [time, setTime] = useState('');
  const [priceWithPlan, setPriceWithPlan] = useState<string, null>(null);
  const [priceWithoutPlan, setPriceWithoutPlan] = useState<string, null>(null);

  const getPrice = async (event) => {
    event.preventDefault();
    const result = price?.edges.find((i) => i?.node.origin === origin && i?.node.destiny === destiny);
    if (!result) {
      return alert('Preço não encontrado, tente novamente.');
    }

    const selectedPlan = plans?.edges.find((i) => i?.node.name === plan);
    console.log(selectedPlan, plan, 'planplan');
    console.log(result?.node?.pricePerMinute, time);

    const withPlan = result?.node?.pricePerMinute * (time - selectedPlan?.node?.minutes);
    console.log(priceWithPlan, 'asuhasuh');

    if (!Number.isNaN(withPlan) && withPlan >= 0) {
      setPriceWithPlan(withPlan + withPlan * 0.1);
    } else {
      setPriceWithPlan('0');
    }

    const withoutPlan = result?.node?.pricePerMinute * time;
    console.log(priceWithoutPlan);

    if (!Number.isNaN(withoutPlan) && withoutPlan >= 0) {
      setPriceWithoutPlan(withoutPlan);
    } else {
      setPriceWithoutPlan('0');
    }

    return priceRef && priceRef?.current.scrollIntoView(false);
  };
  console.log(priceWithPlan, priceWithoutPlan, 'priceWithPlan, priceWithoutPlan');
  return (
    <Container>
      <Logo>Telzir</Logo>

      <Content>
        <Title>FaleMais</Title>
        <Description>
          FaleMais é o novo produto da Telzir. Você escolhe um plano de celular e ganha minutos de graça! Para os
          minutos excedentes, você só paga uma pequena taxa.
          <a style={{ fontWeight: 'bold' }} onClick={() => formRef?.current.scrollIntoView()}>
            Gostou? Clique aqui para fazer uma simulação !
          </a>
        </Description>
        <Infos>
          <Info>
            <InfoTitle>FaleMais 30</InfoTitle>
            <InfoValue>30 Minutos</InfoValue>
          </Info>

          <Info>
            <InfoTitle>FaleMais 70</InfoTitle>
            <InfoValue>70 Minutos</InfoValue>
          </Info>
          <Info>
            <InfoTitle>FaleMais 120</InfoTitle>
            <InfoValue>120 Minutos</InfoValue>
          </Info>
        </Infos>
        <DescriptionForm>
          Calcule o valor da sua chamada com o novo produto da <span style={{ fontWeight: 'bold' }}>TelZir</span>:
        </DescriptionForm>
        <Form ref={formRef} onSubmit={getPrice}>
          <Input
            id="origin"
            value={origin}
            name="origin"
            label="Origem(DDD)"
            min="3"
            max="3"
            maxlength="3"
            onChange={(e) => setOrigin(e.target.value)}
          />
          <Input
            id="destiny"
            value={destiny}
            name="destiny"
            label="Destino(DDD)"
            min="3"
            max="3"
            maxlength="3"
            onChange={(e) => setDestiny(e.target.value)}
          />
          <Input
            id="time"
            value={time}
            name="time"
            label="Tempo da Chamada(minutos)"
            onChange={(e) => setTime(e.target.value)}
            type="number"
          />

          <Select
            id="plan"
            value={plan}
            name="plan"
            label="Selecione o plano"
            onChange={(e) => setPlan(e.target.value)}
            selectItens={formatPlans(plans)}
            type="number"
          />

          <SubmitButton type="submit">Calcular</SubmitButton>
        </Form>
        <Infos ref={priceRef}>
          {priceWithPlan && priceWithoutPlan && (
            <>
              <Info>
                <InfoTitle>Com o Plano:</InfoTitle>
                <InfoValue>
                  {priceWithPlan.toLocaleString('pt-br', {
                    style: 'currency',
                    currency: 'BRL',
                  })}
                </InfoValue>
              </Info>
              <Info>
                <InfoTitle>Sem o Plano:</InfoTitle>
                <InfoValue>
                  {priceWithoutPlan.toLocaleString('pt-br', {
                    style: 'currency',
                    currency: 'BRL',
                  })}
                </InfoValue>
              </Info>
            </>
          )}
        </Infos>
      </Content>
    </Container>
  );
}

const query = graphql`
  query AppQuery {
    plans {
      edges {
        node {
          id
          name
          minutes
        }
      }
    }
    price {
      edges {
        node {
          id
          origin
          pricePerMinute
          destiny
        }
      }
    }
  }
`;

export default App;
