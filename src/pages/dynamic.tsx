import { GetServerSideProps, NextPage } from "next";
import { ReactNode, useEffect, useState } from "react";
import { Col, Container, Row } from "reactstrap";

interface ApiResponse {
    name: string;
    timestamp: Date
}

export const getServerSideProps: GetServerSideProps = async () => {
                                        //para evitar problemas no futuro, foi utilizada uma template string com uma variavel de ambiente pública. Sempre que quiser criar uma variavel de ambiente e ela puder ficar publica criamos como NEXT_PUBLIC
    const serverSideData:ApiResponse = await fetch(`${process.env.NEXT_PUBLIC_APIURL}/api/hello`).then(res => res.json()) //ao inves de utilizar a API com o caminho relativo, o next precisa que passe o caminho absoluto da URL, porque o codigo vai rodar do lado do servidor.
    
    //para disponibilizar os dados no componente, precisa dar um return 
    //precisa conter a propriedade props, pois as props são as que vao ficar disponeiveis para acessar na função
    return {
        props: {
            serverSideData
        }
    }

}

const Dynamic: NextPage = (props: {
    children?: ReactNode
    serverSideData?: ApiResponse
}) => {
    const [clientSideData, setClientSideData] = useState<ApiResponse>()

    useEffect(() => {
        fetchData()
    }, [])

    const fetchData = async () => {
        const data = await fetch("/api/hello").then(res => res.json())
        setClientSideData(data)
    }

    return(
        <Container tag="main">
            <h1 className="my-5">
              Como funcionam as renderizações do Next.js
            </h1>
            <Row>
              <Col>
                <h3>
                  Gerado no servidor:
                </h3>
                <h2>
                    {props.serverSideData?.timestamp.toString()}
                </h2>
              </Col>        
              <Col>
                <h3>
                  Gerado no cliente:
                </h3>
                <h2>
                    {clientSideData?.timestamp.toString()}
                </h2>
              </Col>
            </Row>
        </Container>
    )
}

export default Dynamic