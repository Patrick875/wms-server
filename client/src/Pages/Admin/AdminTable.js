function TableItem({
	product,
	userEmail,
	price,
	quantity,
	total,
	status,
	date,
}) {
	return (
		<tr>
			<td className="text-capitalize">{product}</td>
			<td className="fw-bold">{userEmail}</td>
			<td>{price}</td>
			<td>{quantity}</td>
			<td>{total}</td>
			<td className="mx-1">{status}</td>
			<td className="mx-1">{date}</td>
		</tr>
	);
}

function AdminTable({ orders }) {
	orders = orders && !("error" in orders) ? orders : null;
	orders.map((order) => console.log(order));
	return (
		<div className="table-area">
			<table className="responsive-table table table-borderless">
				<thead>
					<tr>
						<th>Product</th>
						<th>Email</th>
						<th>Price/unit</th>
						<th>Quantity</th>
						<th>Total</th>
						<th>Status</th>
						<th>Date</th>
					</tr>
				</thead>
				<tbody>
					{orders ? (
						orders.map((order) => (
							<TableItem
								key={order._id}
								product={order.product.name}
								userEmail={order.user_email}
								price={order.product.price}
								quantity={order.product.quantity}
								total={order.product.price * order.product.quantity}
								status={order.activated ? "Activated" : "Pending"}
								date={order.createdAt}
							/>
						))
					) : (
						<p>Orders not available</p>
					)}
				</tbody>
			</table>
		</div>
	);
}

export default AdminTable;
