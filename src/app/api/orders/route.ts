import { NextResponse } from "next/server";

interface Order {
  id: string;
  customer: {
    name: string;
    phone: string;
    email: string;
    houseNo: string;
    address: string;
    landmark: string;
    city: string;
    state: string;
    pincode: string;
    note: string;
  };
  item: {
    id: string;
    name: string;
    price: string;
    imageUrl: string;
    size: string;
    quantity: number;
  };
  payment: {
    method: string;
    status: string;
    timestamp: string;
  };
  status: "Pending" | "Confirmed" | "Tailoring" | "Shipped" | "Out for Delivery" | "Delivered";
  location: string;
  createdAt: string;
}

// Persist orders array across dev hot-reloads
interface GlobalOrders {
  ordersList?: Order[];
}

const globalRef = global as unknown as GlobalOrders;
if (!globalRef.ordersList) {
  globalRef.ordersList = [
    {
      id: "AC-48201",
      customer: {
        name: "Mira Kapoor",
        phone: "9041588678",
        email: "mira.kapoor@gmail.com",
        houseNo: "A-12",
        address: "Prithviraj Road",
        landmark: "Near Claridges Hotel",
        city: "New Delhi",
        state: "Delhi",
        pincode: "110011",
        note: "Add extra margin on sleeves, please."
      },
      item: {
        id: "leh-1",
        name: "The Mughal Vriksh Lehenga",
        price: "₹4,80,000",
        imageUrl: "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?q=80&w=1200&auto=format&fit=crop",
        size: "M",
        quantity: 1
      },
      payment: {
        method: "UPI Pay",
        status: "Paid",
        timestamp: new Date().toISOString()
      },
      status: "Tailoring",
      location: "Atelier Studio Noida",
      createdAt: new Date(Date.now() - 3600000 * 2).toISOString() // 2 hours ago
    }
  ];
}

const orders = globalRef.ordersList;

export async function GET() {
  return NextResponse.json({ success: true, data: orders });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { customer, item, payment } = body;

    if (!customer || !item || !payment) {
      return NextResponse.json({ success: false, error: "Missing fields" }, { status: 400 });
    }

    // Generate unique order ID
    const randomNum = Math.floor(10000 + Math.random() * 90000);
    const orderId = `AC-${randomNum}`;

    const newOrder: Order = {
      id: orderId,
      customer,
      item,
      payment: {
        ...payment,
        timestamp: new Date().toISOString()
      },
      status: "Confirmed",
      location: "Atelier Studio Noida",
      createdAt: new Date().toISOString()
    };

    orders.unshift(newOrder); // Add to the beginning

    return NextResponse.json({ success: true, data: newOrder });
  } catch (error) {
    console.error("Failed to create order:", error);
    return NextResponse.json({ success: false, error: "Server error" }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const { id, status, location } = body;

    if (!id || !status) {
      return NextResponse.json({ success: false, error: "Missing order ID or status" }, { status: 400 });
    }

    const orderIndex = orders.findIndex((o) => o.id === id);
    if (orderIndex === -1) {
      return NextResponse.json({ success: false, error: "Order not found" }, { status: 404 });
    }

    orders[orderIndex].status = status;
    if (location !== undefined) {
      orders[orderIndex].location = location;
    }

    return NextResponse.json({ success: true, data: orders[orderIndex] });
  } catch (error) {
    console.error("Failed to update order:", error);
    return NextResponse.json({ success: false, error: "Server error" }, { status: 500 });
  }
}
