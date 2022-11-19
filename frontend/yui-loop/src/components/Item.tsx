import React, {FC, useContext} from "react";
// material-ui
import {
  Card,
  CardContent,
  Divider,
  Button,
  Collapse,
  Grid
} from "@material-ui/core";
import {makeStyles} from '@material-ui/core/styles'
import { NONAME } from "dns";

interface TextCardProps {
    month: string,
    date: string,
    start: string,
    destination: string,
    time: string,
    capacity: string
}

const useStyles = makeStyles({
    card_opened: {
        border: 'solid 3px',
        'margin-right': '30px',
        'margin-left': '30px',
    },
    
    card_closed: {
        'margin-right': '30px',
        'margin-left': '30px',
    }
});

const Item:FC<TextCardProps> = (props) => {
  const classes = useStyles()
  const [expanded, setExpanded] = React.useState(false);
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <div>
        <Divider/>
        <div>
          <Button
            fullWidth
            onClick={handleExpandClick}
          >
            {expanded ? "閉じるぞ" : "開くぞ"}
          </Button>
        </div>
      <Card variant="outlined" className={`classes.card_+${expanded ? 'opened' : 'closed'}`}>
        <CardContent>
          <Collapse in={!expanded} timeout="auto" unmountOnExit/>
          <Collapse in={expanded} timeout="auto" unmountOnExit>
            <div>
                <Grid container>
                    <Grid item={true} sm ={1}/>
                        <Grid item={true} sm={5}>
                            日時：{props.month}/{props.date}
                        </Grid>
                        <Grid item={true} sm={5}>
                            出発時間：{props.time}
                        </Grid>
                    <Grid item={true} sm={1}/>
                    <Grid item={true} sm={1}/>
                        <Grid item={true} sm={5}>
                            出発場所：{props.start}
                        </Grid>
                        <Grid item={true} sm={5}>
                            到着場所：{props.destination}<br/>
                        </Grid>
                    <Grid item={true} sm={1}/>
                    <Grid item={true} sm={4}/>
                    <Grid item={true} sm={4}>
                        定員：{props.capacity}
                    </Grid>
                </Grid>
            </div>
          </Collapse>
        </CardContent>
      </Card>
    </div>
  );
};

export default Item