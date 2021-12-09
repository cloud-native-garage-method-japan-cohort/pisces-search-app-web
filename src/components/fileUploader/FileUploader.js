import React, { useCallback, useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  Grid,
  Input,
  InputLabel,
  MenuItem,
  Select,
} from "@material-ui/core";
import {
  CloudUpload as CloudUploadIcon,
} from "@material-ui/icons";

const FileUploader = (props) => {
  const [fileType, setFileType] = useState("PDF");
  const [file, setFile] = useState(undefined);

  const onChangeFileType = useCallback((event) => {
    setFileType(event.target.value);
  }, [fileType, setFileType]);
  const onChangeFile = useCallback((event) => {
    setFile(event.target.files[0]);
  }, [file, setFile]);
  const onClickUpload = useCallback((event) => {
    console.log(file);
    const fileReader = new FileReader();
    fileReader.onload = () => {
      console.log(fileReader.result);
    };
    fileReader.readAsText(file);
  }, [file]);

  return (
    <Dialog maxWidth="xs" open={props.open} onClose={props.onClose} fullWidth>
      <DialogTitle>ファイルのアップロード</DialogTitle>
      <DialogContent>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel id="file-type-select-label">File type</InputLabel>
              <Select labelId="file-type-select-label" value={fileType} onChange={onChangeFileType}>
                <MenuItem value="PDF">PDF</MenuItem>
                <MenuItem value="Word">Word</MenuItem>
                <MenuItem value="PowerPoint">PowerPoint</MenuItem>
                <MenuItem value="Excel">Excel</MenuItem>
                <MenuItem value="JSON">JSON</MenuItem>
                <MenuItem value="HTML">HTML</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <Input type="file" onChange={onChangeFile} />
            </FormControl>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" onClick={props.onClose}>CANCEL</Button>
        <Button
          variant="contained"
          color="primary"
          startIcon={<CloudUploadIcon />}
          onClick={onClickUpload}
        >
          UPLOAD
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default FileUploader;