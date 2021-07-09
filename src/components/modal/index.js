import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import Divider from "@material-ui/core/Divider";
import DialogTitle from "@material-ui/core/DialogTitle";
import Grid from "@material-ui/core/Grid";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Chip from "@material-ui/core/Chip";
import "./modal-style.css";
import { useDispatch } from "react-redux";
import { postCourseRecommendationAsync } from "../../reducers/courses-slice";
const useStyles = makeStyles((theme) => ({
  styledHeader: {
    "& h2": {
      fontSize: "2rem",
    },
  },
  paperBorder: { borderRadius: "10px" },
  paper: { padding: "30px", width: "1100px" },
  dividerBottom: { "margin-bottom": "30px" },
  dividerBoth: { "margin-top": "30px", "margin-bottom": "30px" },
  confirmButton: {
    textTransform: "none",
    backgroundColor: "#2ECC71",
    color: "white",
    "&:hover": { backgroundColor: "#298d85" }, // change here hover background color
  },
  cancelButton: { color: "grey", textTransform: "none", marginRight: "8px" },
  addTagButton: {
    backgroundColor: "#7D7D7D",
    color: "white",
    textTransform: "none",
    marginLeft: "10px",
  },
  chip: { margin: "0px 2px" },
}));

const FormDialog = ({ open, setOpen }) => {
  const classes = useStyles();
  const [courseTitle, setCourseTitle] = useState("");
  const [courseUrl, setCourseUrl] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [tags, setTags] = useState("");
  const [finalTags, setFinalTags] = useState([]);

  const dispatch = useDispatch();

  let tagsArray = [];

  const handleAddTags = (_tags) => {
    setTags("");
    tagsArray = finalTags;
    _tags.split(",").forEach((tag) => tagsArray.push(tag));
    setFinalTags(tagsArray);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmitRecommendation = () => {
    console.log("finalTags", finalTags);
    dispatch(
      postCourseRecommendationAsync({
        courseTitle,
        courseUrl,
        description,
        category: category.toLowerCase(),
        tags: finalTags,
      })
    );
    setOpen(false);
  };

  const handleChange = ({ target: { value } }) => {
    setCategory(value);
  };

  const handleDelete = (tag) => {
    tagsArray = [...finalTags];
    tagsArray.splice(tagsArray.indexOf(tag), 1);
    setFinalTags(tagsArray);
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="course-rec"
        maxWidth="xl"
        PaperProps={{
          classes: {
            rounded: classes.paperBorder,
            root: classes.paper,
          },
        }}
      >
        <DialogTitle id="course-rec" className={classes.styledHeader}>
          Suggest a Course
        </DialogTitle>
        <DialogContent>
          <DialogContentText color="textprimary">
            What is the course about?
          </DialogContentText>
          <Divider classes={{ root: classes.dividerBottom }} />
          <Grid container spacing={4}>
            <Grid item sm={12} md={6}>
              <TextField
                required
                id="title"
                label="Course Title"
                placeholder="Docker and Kubernetes: The complete course"
                variant="outlined"
                InputLabelProps={{
                  shrink: true,
                }}
                fullWidth={true}
                onChange={({ target: { value } }) => setCourseTitle(value)}
              />
            </Grid>
            <Grid item sm={12} md={6}>
              <TextField
                required
                id="url"
                label="Course URL"
                placeholder="https://www.udemy.com/course/docker-and-kubernetes-the-complete-guide/"
                variant="outlined"
                InputLabelProps={{
                  shrink: true,
                }}
                fullWidth
                onChange={({ target: { value } }) => setCourseUrl(value)}
                className="test-validation"
              />
            </Grid>
            <Grid item sm={12} md={6}>
              <TextField
                id="description"
                label="Description (Optional)"
                placeholder="Build, test, and deploy Docker applications with Kubernetes while learning production-style development workflows"
                variant="outlined"
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={({ target: { value } }) => setDescription(value)}
                multiline
                fullWidth
              />
            </Grid>
            <Grid item sm={12} md={6}>
              <FormControl variant="outlined" fullWidth>
                <InputLabel id="demo-simple-select-outlined-label" shrink>
                  Topic
                </InputLabel>
                <Select
                  labelId="demo-simple-select-outlined-label"
                  id="demo-simple-select-outlined"
                  value={category}
                  onChange={handleChange}
                  label="Topic"
                  displayEmpty
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={"design"}>Design</MenuItem>
                  <MenuItem value={"engineering"}>Engineering</MenuItem>
                  <MenuItem value={"human_resources"}>Human Resources</MenuItem>
                  <MenuItem value={"management"}>Management</MenuItem>
                  <MenuItem value={"marketing"}>Marketing</MenuItem>
                  <MenuItem value={"product"}>Product</MenuItem>
                  <MenuItem value={"sales"}>Sales</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid container item sm={6} spacing={0}>
              <Grid item sm={9}>
                <TextField
                  id="description"
                  label="Add a comma between each tag. - Ex: CSS, testing"
                  placeholder="lorem, ipsum, dolor, sit"
                  variant="outlined"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  onChange={({ target: { value } }) => setTags(value)}
                  value={tags}
                  multiline
                  fullWidth
                />
              </Grid>
              <Grid item sm={3}>
                <Button
                  onClick={() => handleAddTags(tags)}
                  variant="contained"
                  classes={{ contained: classes.addTagButton }}
                >
                  Add Tags
                </Button>
              </Grid>
            </Grid>
            {!!finalTags.length && (
              <Grid item md={12}>
                {finalTags.map((tag) => (
                  <Chip
                    key={tag}
                    label={tag}
                    onDelete={() => handleDelete(tag)}
                    className={classes.chip}
                  />
                ))}
              </Grid>
            )}
          </Grid>
        </DialogContent>
        <Divider classes={{ root: classes.dividerBoth }} />
        <DialogActions>
          <Button
            onClick={handleClose}
            variant="outlined"
            classes={{ outlined: classes.cancelButton }}
          >
            Close window
          </Button>
          <Button
            onClick={handleSubmitRecommendation}
            variant="contained"
            classes={{ contained: classes.confirmButton }}
          >
            Submit Recommendation
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default FormDialog;
