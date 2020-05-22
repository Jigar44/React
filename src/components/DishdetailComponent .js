import React, { Component } from 'react';
import { Card, CardImg, CardText, CardBody,
    CardTitle, Breadcrumb, BreadcrumbItem, Button, 
    Modal, ModalHeader, ModalBody, Label, Row } from 'reactstrap';
import { Control, LocalForm, Errors } from 'react-redux-form';
import { Link } from 'react-router-dom';


    function RenderDish({dish}){   

        if (dish != null) {
            return (
                <div className='col-12 col-md-5 m-1'>
                    <Card>
                        <CardImg width="100%" src={dish.image} alt={dish.name} />
                        <CardBody>
                            <CardTitle>{dish.name}</CardTitle>
                            <CardText>{dish.description}</CardText>
                        </CardBody>``
                    </Card>
                </div>
            )
        }
        else {
            return (<div></div>)
        }
    }

    function RenderComments({comments}) {
        if (comments == null) {
            return (<div></div>)
        }
        const cmnts = comments.map(comment => {
            return (
                <li key={comment.id}>
                    <p>{comment.comment}</p>
                    <p>-- {comment.author},
                    &nbsp;
                    {new Intl.DateTimeFormat('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: '2-digit'
                        }).format(new Date(comment.date))}
                    </p>
                </li>
            )
        })
        return (
            <div className='col-12 col-md-5 m-1'>
                <h4> Comments </h4>
                <ul className='list-unstyled'>
                    {cmnts}
                </ul>
                <CommentForm />
            </div>
            
        )
    }

    const DishDetail = (props) => {
        const dish = props.dish
        if (dish == null) {
            return (<div></div>)
        }
    
        return (
                <div className="container">
                <div className="row">
                    <Breadcrumb>
                        <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                        <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>{props.dish.name}</h3>
                        <hr />
                    </div>                
                </div>
                <div className="row">
                    <RenderDish dish={props.dish} />
                    <RenderComments comments={props.comments} />
                </div>
                </div>
            );
    }

    
    const required = (val) => val && val.length;
    const maxLength = (len) => (val) => !(val) || (val.length <= len);
    const minLength = (len) => (val) => val && (val.length >= len);

    class CommentForm extends Component {

        constructor(props) {
            super(props);
        
            this.state = {
                author: '',
                message: '',
                touched: {
                    message: false,
                    author: '',
                },
                isModalOpen: false
            }
            this.toggleModal = this.toggleModal.bind(this);
            this.handleBlur = this.handleBlur.bind(this);
          }
    
        handleBlur = (field) => (evt) => {
            this.setState({
                touched: { ...this.state.touched, [field]: true }
            });
        }

          toggleModal() {
            this.setState({
                isModalOpen: !this.state.isModalOpen
              });
          }

          validate(author) {
            const errors = {
                author: ''
            }
    
            if(this.state.touched.author && author.length < 3)
                errors.author = 'Last Name shold be >=3 characters';
            else if (this.state.touched.author && author.length > 10)
                errors.author = 'Last Name shold be <=10 characters';
    
            return errors;
        }

        render() {
            return(
                <React.Fragment>
                    <div className="row">
                    <Button outline onClick={this.toggleModal}>
                        <span className="fa fa-pencil fa-lg"></span> Submit Comment
                    </Button>
                    </div>
                    <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                        <ModalHeader isOpen={this.state.isModalOpen} toggle={this.toggleModal}>Submit Comment</ModalHeader>
                            <ModalBody>
                                <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                                    <Row className="form-group m-2">
                                        <Label htmlFor="rating">Rating</Label>
                                        <Control.select model=".rating" name="rating"
                                            className="form-control">
                                            <option>1</option>
                                            <option>2</option>
                                            <option>3</option>
                                            <option>4</option>
                                            <option>5</option>
                                        </Control.select>
                                    </Row>
                                    <Row className="form-group m-2">
                                        <Label htmlFor="author">Your Name</Label>
                                        <Control.text model=".author" name="author"
                                            className="form-control" 
                                            placeholder="Your Name"  validators={{
                                                required, minLength: minLength(3), maxLength: maxLength(15)
                                            }}/>
                                        <Errors
                                            className="text-danger"
                                            model=".author"
                                            show="touched"
                                            messages={{
                                                required: 'Required',
                                                minLength: 'Must be greater than 2 characters',
                                                maxLength: 'Must be 15 characters or less'
                                            }}
                                         />
                                    </Row>
                                    <Row className="form-group m-2">
                                        <Label htmlFor="message">Comment</Label>
                                        <Control.textarea model=".message" id="message" name="message"
                                                rows="7"
                                                className="form-control" />
                                    </Row>
                                    <Row className="form-group m-2">
                                    <Button type="submit" color="primary">
                                        Submit
                                    </Button>
                                    </Row>
                            </LocalForm>
                        </ModalBody>
                    </Modal>
                </React.Fragment>
            );
        }
    }

export default DishDetail;