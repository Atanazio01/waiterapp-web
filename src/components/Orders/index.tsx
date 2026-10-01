import type { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import socketIo from "socket.io-client";
import { api } from "../../lib/api";
import type { Order } from "../../types/Order";
import { OrdersBoard } from "../OrdersBoard";
import { Container } from "./styles";

export function Orders() {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    const socket = socketIo("http://localhost:3001", {
      transports: ["websocket"],
    });

    socket.on("order@new", (order) => {
      setOrders((prevState) => prevState.concat(order));
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    api.get("/orders").then((response: AxiosResponse<Order[]>) => {
      setOrders(response.data);
    });
  }, []);

  const waitingOrders = orders.filter((order) => order.status === "WAITING");
  const inProduction = orders.filter((order) => order.status === "IN_PRODUCTION");
  const done = orders.filter((order) => order.status === "DONE");

  function handleCancelOrder(orderId: string) {
    setOrders((prevState) => prevState.filter((order) => order._id !== orderId));
  }

  function handleChangeOrderStatus(orderId: string, status: Order["status"]) {
    setOrders((prevState) => prevState.map((order) => (order._id === orderId ? { ...order, status } : order)));
  }

  return (
    <Container>
      <OrdersBoard
        icon="🕒"
        title="Fila de espera"
        orders={waitingOrders}
        onCancelOrder={handleCancelOrder}
        onChangeOrderStatus={handleChangeOrderStatus}
      />
      <OrdersBoard
        icon="👨‍🍳"
        title="Em preparação"
        orders={inProduction}
        onCancelOrder={handleCancelOrder}
        onChangeOrderStatus={handleChangeOrderStatus}
      />
      <OrdersBoard
        icon="✅"
        title="Pronto!"
        orders={done}
        onCancelOrder={handleCancelOrder}
        onChangeOrderStatus={handleChangeOrderStatus}
      />
    </Container>
  );
}
