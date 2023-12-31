import { Divider, Grid, Table, TableCell, TableContainer, TableRow, Typography } from "@mui/material"
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { Product } from "../../App/Layout/Models/product";
import agent from "../../App/API/agent";

export default function ProductDetails() {
    const {id} = useParams<{id: string}>();
    const [products, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
       id && agent.Catalog.details(parseInt(id))
        .then(response => setProduct(response))
        .catch(error=>console.log(error))
        .finally(()=> setLoading(false)); 
    }, [id])

    if(loading) return <h3>Loading...</h3>

    if(!products) return <h3>Product not found</h3>

    return (
        <Grid container spacing={6}>
            <Grid item xs={6}>
                <img src={products.pictureUrl} alt={products.name} style={{width: '100%'}}/>
            </Grid>
            <Grid item xs={6}>
                <Typography variant='h3'>{products.name}</Typography>
                <Divider sx={{mb: 2}}/>
                <Typography variant='h4' color='secondary'>${(products.price / 100).toFixed(2)}</Typography>
                <TableContainer>
                    <Table>
                        <TableRow>
                            <TableCell> Name </TableCell>
                            <TableCell> {products.name} </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell> Description </TableCell>
                            <TableCell> {products.description} </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell> Type </TableCell>
                            <TableCell> {products.type} </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell> Brand </TableCell>
                            <TableCell> {products.brand} </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell> Quantity in stock </TableCell>
                            <TableCell> {products.quantityInStock} </TableCell>
                        </TableRow>
                    </Table>
                </TableContainer>
            </Grid>
        </Grid>
    )
}