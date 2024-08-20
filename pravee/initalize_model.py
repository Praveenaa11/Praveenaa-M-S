import time
import pickle
from pathlib import Path
import pandas as pd
import os

BASE_DIR = Path(__file__).resolve().parent.parent
DATASET_PATH = os.path.join(BASE_DIR, 'initial_dataset1.csv')
MODEL_PATH = os.path.join(BASE_DIR, 'br1.pkl')
mf = open(MODEL_PATH, 'rb')


class modelpredictor:
    
    datasetfile = pd.read_csv(DATASET_PATH)
    actual_data = []
    def __init__(self):
        start_time = time.time()
        print('Loading Model')
        self.model = pickle.load(mf)
        print('Model Loaded in', time.time() - start_time)
        start_time = time.time()
        print('Processing Dataset...')
        t = self.datasetfile['Title'].to_list()
        a = self.datasetfile['Author'].to_list()
        r = self.datasetfile['Rating'].to_list()
        pr = self.datasetfile['Price'].to_list()
        w = self.datasetfile['URLs'].to_list()
        m = self.datasetfile['Main Genre'].to_list()
        s = self.datasetfile['Sub Genre'].to_list()
        for i in range(0,6778):
            l = [t[i], a[i], m[i], s[i], r[i], pr[i], w[i]]
            self.actual_data.append(l)
        print('Dataset Processed in', time.time() - start_time)
        
    def test(self, value):
        resp = self.model.predict([value])
        flag=0
        l2=[]
        for i in range(0, 6778):
            if  self.actual_data[i][2] == resp[0]:
                l2.append([self.actual_data[i][0], self.actual_data[i][1], self.actual_data[i][2], self.actual_data[i][3], self.actual_data[i][4], self.actual_data[i][5], self.actual_data[i][6]])
                flag +=1
            if flag == 10:
                break
        sl= sorted(l2, key = lambda x: x[4], reverse = True)
        dic = {'input':{"prompt":value, "predicted_genre":resp[0]}, 'suggestions': sl}
        return dic