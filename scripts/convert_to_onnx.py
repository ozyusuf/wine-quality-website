import joblib
import numpy as np
from skl2onnx import convert_sklearn
from skl2onnx.common.data_types import FloatTensorType
import os
import onnxmltools
from xgboost import XGBClassifier

def convert_model():
    # Path to the model
    # Force using Red Wine model (Random Forest) as it is a standard sklearn pipeline
    # and much more reliable for ONNX conversion than the standalone XGBoost model.
    model_path = 'public/assets/ml-project/models/red_production_pipeline.pkl'


    print(f"Loading model from: {model_path}")
    
    try:
        loaded_obj = joblib.load(model_path)
        if isinstance(loaded_obj, dict):
            print("Detected dictionary structure. Extracting 'pipeline'...")
            pipeline = loaded_obj['pipeline']
        else:
            pipeline = loaded_obj
            
    except Exception as e:
        print(f"Error loading model: {e}")
        return

    # Helper to remove SMOTE (only needed for training)
    # skl2onnx fails on imblearn steps usually
    from sklearn.pipeline import Pipeline
    
    # Remove SMOTE as before...
    
    # Check if it's actually a Pipeline with steps
    if hasattr(pipeline, 'steps'):
        print("Pipeline detected. filtering steps...")
        new_steps = []
        for name, step in pipeline.steps:
            if name == 'smote':
                print("Removing SMOTE step (training only)...")
                continue
            new_steps.append((name, step))
        # Reconstruct pipeline without SMOTE
        pipeline = Pipeline(new_steps)
    else:
        print("Object is not a Pipeline (likely just the Classifier). Using directly.")

    initial_type = [('float_input', FloatTensorType([None, 11]))]

    print("Converting model to ONNX (ZipMap=False for Web Compatibility)...")
    
    # Use standard convert_sklearn with zipmap=False
    # This ensures probabilities are returned as a Float Tensor, not a Sequence/Map
    onnx_model = convert_sklearn(pipeline, 
                                 initial_types=initial_type,
                                 options={'zipmap': False})

    output_path = 'wine_quality_model.onnx'
    with open(output_path, "wb") as f:
        f.write(onnx_model.SerializeToString())
    
    print(f"Successfully saved ONNX model to: {output_path}")
    print("REMINDER: Move this file to the React public/ folder!")

if __name__ == "__main__":
    convert_model()
